import { ParsedOpcode } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'

/*
  0x3XNN
  Skips the next instruction if VX equals NN. (Usually the next instruction is a jump to 
  skip a code block)
*/
export const registerEqualsConstant = (
  chip8State: Chip8,
  { registerX, twoDigitConstant }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    programCounter:
      vRegisters[registerX] === twoDigitConstant ? programCounter + 0x4 : programCounter + 0x2
  }
}

/*
  0x4XNN
  Skips the next instruction if VX doesn't equal NN. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registerDoesNotEqualConstant = (
  chip8State: Chip8,
  { registerX, twoDigitConstant }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    programCounter:
      vRegisters[registerX] !== twoDigitConstant ? programCounter + 0x4 : programCounter + 0x2
  }
}

/*
  0x5XY0
  Skips the next instruction if VX equals VY. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registersAreEqual = (
  chip8State: Chip8,
  { registerX, registerY }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    programCounter:
      vRegisters[registerX] === vRegisters[registerY] ? programCounter + 0x4 : programCounter + 0x2
  }
}

/*
  0x9XY0
  Skips the next instruction if VX doesn't equal VY. (Usually the next instruction is a 
  jump to skip a code block)
*/
export const registersAreNotEqual = (
  chip8State: Chip8,
  { registerX, registerY }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    programCounter:
      vRegisters[registerX] !== vRegisters[registerY] ? programCounter + 0x4 : programCounter + 0x2
  }
}
