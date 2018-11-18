import { Chip8, KeyState, OpcodeFunc } from 'src/chip8/types'
import { chip8KeyMapping } from 'src/constants'

const pressKey = (key: string): OpcodeFunc => (chip8State: Chip8): Chip8 => {
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

const releaseKey = (key: string): OpcodeFunc => (chip8State: Chip8): Chip8 => {
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

export const chip8Controller = { pressKey, releaseKey }
