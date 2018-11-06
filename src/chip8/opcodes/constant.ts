import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0x6XNN
  Sets VX to NN.
*/
export const setRegisterToConstant = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(chip8State.vRegisters, {
      [registerXNumber]: constant
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  7XNN
  Adds NN to VX. (Carry flag is not changed)
*/
export const addConstantToRegister = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(chip8State.vRegisters, {
      [registerXNumber]: registerXValue + constant
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}
