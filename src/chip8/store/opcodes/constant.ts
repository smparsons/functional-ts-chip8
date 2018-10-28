import { Chip8, chip8Selectors } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters } from './helpers'

/*
  0x6XNN
  Sets VX to NN.
*/
export const setRegisterToConstant = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: constant }),
    continueToNextInstruction
  )(chip8State)
}

/*
  7XNN
  Adds NN to VX. (Carry flag is not changed)
*/
export const addConstantToRegister = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: registerXValue + constant }),
    continueToNextInstruction
  )(chip8State)
}
