import { Chip8 } from 'src/chip8/types'

import { parseOpcode } from './helpers'

/*
  0x6XNN
  Sets VX to NN.
*/
export const setRegisterToConstant = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, twoDigitConstant } = parseOpcode(opcode)

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
export const addConstantToRegister = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, twoDigitConstant } = parseOpcode(opcode)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] + twoDigitConstant
    }),
    programCounter: programCounter + 0x2
  }
}
