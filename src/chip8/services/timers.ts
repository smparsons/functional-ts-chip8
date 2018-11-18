import { Chip8 } from 'src/chip8/types'

const decrement = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  delayTimer: chip8State.delayTimer > 0 ? chip8State.delayTimer - 1 : chip8State.delayTimer,
  soundTimer: chip8State.soundTimer > 0 ? chip8State.soundTimer - 1 : chip8State.soundTimer,
  audioFlag: chip8State.soundTimer === 1
})

export const chip8Timers = { decrement }
