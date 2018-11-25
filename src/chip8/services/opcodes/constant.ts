import { ParsedOpcode } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'

/*
  0x6XNN
  Sets VX to NN.
*/
export const setRegisterToConstant = (
  chip8State: Chip8,
  { registerX, twoDigitConstant }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: twoDigitConstant
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  7XNN
  Adds NN to VX. (Carry flag is not changed)
*/
export const addConstantToRegister = (
  chip8State: Chip8,
  { registerX, twoDigitConstant }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] + twoDigitConstant
    }),
    programCounter: programCounter + 0x2
  }
}
