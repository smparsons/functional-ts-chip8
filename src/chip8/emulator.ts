import { Chip8, chip8InitialState, StartGameRequest } from 'src/chip8/types'
import { numberOfCyclesUntilDraw } from 'src/constants'

import { chip8 } from './chip8'
import { io } from './io'

// tslint:disable:no-mixed-interface
// tslint:disable:readonly-keyword
// tslint:disable:no-object-mutation
// tslint:disable:no-this
// tslint:disable:prefer-for-of
// tslint:disable:no-let

export interface Chip8Emulator {
  chip8State: Chip8
  animationRequestId: number | undefined

  readonly pressKey: (key: string) => void
  readonly releaseKey: (key: string) => void
  readonly startGame: (request: StartGameRequest) => Promise<void>
  readonly stepFrame: (canvasContext: CanvasRenderingContext2D, audioContext: AudioContext) => void
  readonly reset: () => void
}

export const createChip8Emulator = (): Chip8Emulator => ({
  chip8State: chip8InitialState,
  animationRequestId: undefined,

  pressKey(key: string): void {
    this.chip8State = this.animationRequestId ? chip8.pressKey(this.chip8State, key) : this.chip8State
  },

  releaseKey(key: string): void {
    this.chip8State = this.animationRequestId ? chip8.releaseKey(this.chip8State, key) : this.chip8State
  },

  async startGame({ gameName, canvasContext, audioContext }: StartGameRequest): Promise<void> {
    const game = await io.getGameBytes(gameName)
    const initialSeed = io.generateRandomSeed()

    this.chip8State = chip8.initializeChip8(game, initialSeed)

    this.animationRequestId = requestAnimationFrame(() => this.stepFrame(canvasContext, audioContext))
  },

  stepFrame(canvasContext: CanvasRenderingContext2D, audioContext: AudioContext): void {
    for (let i = 0; i < numberOfCyclesUntilDraw; i++) {
      this.chip8State = chip8.emulateCpuCycle(this.chip8State)

      if (this.chip8State.audioFlag) {
        io.playBeep(audioContext)
        this.chip8State = chip8.turnOffAudioFlag(this.chip8State)
      }
    }

    io.renderGraphics(this.chip8State.graphics, canvasContext)

    this.animationRequestId = requestAnimationFrame(() => this.stepFrame(canvasContext, audioContext))
  },

  reset(): void {
    if (this.animationRequestId) {
      window.cancelAnimationFrame(this.animationRequestId)

      this.chip8State = chip8InitialState
      this.animationRequestId = undefined
    }
  }
})
