import { Chip8 } from 'src/chip8/store'

export const continueToNextInstruction = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: chip8State.programCounter + 0x2
})

export const skipNextInstruction = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: chip8State.programCounter + 0x4
})
