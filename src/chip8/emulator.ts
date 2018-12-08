import { Chip8, chip8InitialState } from 'src/chip8/types'
import { chip8NumberOfColumns, chip8NumberOfRows, numberOfCyclesUntilDraw } from 'src/constants'

import { chip8 } from './chip8'

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
  readonly startGame: (gameName: string, canvasContext: CanvasRenderingContext2D) => Promise<void>
  readonly stepFrame: (canvasContext: CanvasRenderingContext2D) => void
  readonly reset: () => void
}

export const createChip8Emulator = (): Chip8Emulator => ({
  chip8State: chip8InitialState,
  animationRequestId: undefined,

  pressKey(key: string): void {
    this.chip8State = this.animationRequestId ? chip8.pressKey(key)(this.chip8State) : this.chip8State
  },

  releaseKey(key: string): void {
    this.chip8State = this.animationRequestId ? chip8.releaseKey(key)(this.chip8State) : this.chip8State
  },

  async startGame(gameName: string, canvasContext: CanvasRenderingContext2D): Promise<void> {
    const game = await getGameBytes(gameName)
    const initialSeed = generateRandomSeed()

    this.chip8State = chip8.initializeChip8(game, initialSeed)

    this.animationRequestId = requestAnimationFrame(() => this.stepFrame(canvasContext))
  },

  stepFrame(canvasContext: CanvasRenderingContext2D): void {
    for (let i = 0; i < numberOfCyclesUntilDraw; i++) {
      const opcode = getNextOpcodeFromMemory(this.chip8State)
      this.chip8State = chip8.emulateCpuCycle(opcode)(this.chip8State)
    }

    renderGraphics(this.chip8State.graphics, canvasContext)

    this.animationRequestId = requestAnimationFrame(() => this.stepFrame(canvasContext))
  },

  reset(): void {
    if (this.animationRequestId) {
      window.cancelAnimationFrame(this.animationRequestId)

      this.chip8State = chip8InitialState
      this.animationRequestId = undefined
    }
  }
})

const getGameBytes = async (gameName: string): Promise<Uint8Array> => {
  const response = await fetch(`/roms/${gameName}`)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

const generateRandomSeed = (): number => Math.floor(Math.random() * 1000)

const getNextOpcodeFromMemory = ({ memory, programCounter }: Chip8): number =>
  (memory[programCounter] << 8) | memory[programCounter + 1]

const renderGraphics = (graphics: Uint8Array, canvasContext: CanvasRenderingContext2D): void => {
  canvasContext.fillStyle = '#000000'
  canvasContext.fillRect(0, 0, chip8NumberOfColumns, chip8NumberOfRows)

  for (let i = 0; i < graphics.length; i++) {
    if (graphics[i]) {
      const coordinateX = i % chip8NumberOfColumns
      const coordinateY = Math.floor(i / chip8NumberOfColumns)

      canvasContext.fillStyle = '#ffffff'
      canvasContext.fillRect(coordinateX, coordinateY, 1, 1)
    }
  }
}
