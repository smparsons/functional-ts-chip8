import { Chip8, ParsedOpcode } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

/*
  0x6XNN
  Sets VX to NN.
*/
export const setRegisterToConstant = (chip8State: Chip8, { registerX, twoDigitConstant }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: updateUint8Array(vRegisters, {
      [registerX]: twoDigitConstant
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  7XNN
  Adds NN to VX. (Carry flag is not changed)
*/
export const addConstantToRegister = (chip8State: Chip8, { registerX, twoDigitConstant }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: updateUint8Array(vRegisters, {
      [registerX]: vRegisters[registerX] + twoDigitConstant
    }),
    programCounter: programCounter + 0x2
  }
}
