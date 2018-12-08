import prand from 'pure-rand'
import { Chip8, Chip8Func, chip8InitialState, KeyState } from 'src/chip8/types'
import { chip8Fontset, chip8KeyMapping } from 'src/constants'
import { pipe2, pipe3 } from 'src/functional'

import { cpu } from './cpu'

const initializeChip8 = (game: Uint8Array, initialSeed: number): Chip8 =>
  pipe3(initializeRandomGenerator(initialSeed), loadFontset, loadGame(game))(chip8InitialState)

const initializeRandomGenerator = (initialSeed: number): Chip8Func => (chip8State: Chip8) => ({
  ...chip8State,
  randomGenerator: prand.congruential(initialSeed)
})

const loadFontset = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  memory: Object.assign(
    Uint8Array.from({ length: 4096 }),
    chip8State.memory,
    ...Array.from(chip8Fontset).map((value, index) => ({
      [index]: value
    }))
  )
})

const loadGame = (game: Uint8Array): Chip8Func => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  memory: Object.assign(
    Uint8Array.from({ length: 4096 }),
    chip8State.memory,
    ...Array.from(game).map((value, index) => ({
      [index + 0x200]: value
    }))
  )
})

const emulateCpuCycle = (opcode: number): Chip8Func => pipe2(cpu.executeOpcode(opcode), cpu.decrementTimers)

const pressKey = (key: string): Chip8Func => (chip8State: Chip8): Chip8 => {
  const mappedKey = chip8KeyMapping[key]
  return mappedKey
    ? {
        ...chip8State,
        keyState: Object.assign(Array.from({ length: 16 }), chip8State.keyState, {
          [mappedKey]: KeyState.Pressed
        })
      }
    : chip8State
}

const releaseKey = (key: string): Chip8Func => (chip8State: Chip8): Chip8 => {
  const mappedKey = chip8KeyMapping[key]
  return mappedKey
    ? {
        ...chip8State,
        keyState: Object.assign(Array.from({ length: 16 }), chip8State.keyState, {
          [mappedKey]: KeyState.Released
        })
      }
    : chip8State
}

const turnOffAudioFlag = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  audioFlag: false
})

export const chip8 = { initializeChip8, emulateCpuCycle, pressKey, releaseKey, turnOffAudioFlag }
