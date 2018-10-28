import { Chip8, chip8Selectors, OpcodeFunc } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters } from './helpers'

/*
  0x8XY1
  Sets VX to VX or VY. (Bitwise OR operation)
*/
export const bitwiseOr = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: registerXValue | registerYValue }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0x8XY2
  Sets VX to VX and VY. (Bitwise AND operation)
*/
export const bitwiseAnd = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: registerXValue & registerYValue }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0xCXNN
  Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.
*/
export const randomBitwiseAnd = (randomNumber: number): OpcodeFunc => (
  chip8State: Chip8
): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const twoDigitConstant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: randomNumber & twoDigitConstant }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0x8XY3
  Sets VX to VX xor VY.
*/
export const bitwiseXor = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: registerXValue ^ registerYValue }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0x8XY6
  Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
*/
export const shiftRight = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)

  return pipe(
    loadRegisters({
      [registerXNumber]: registerXValue >>> 1,
      [0xf]: registerXValue & 0x1
    }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0x8XYE
  Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
*/
export const shiftLeft = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)

  return pipe(
    loadRegisters({
      [registerXNumber]: registerXValue << 1,
      [0xf]: registerXValue >>> 7
    }),
    continueToNextInstruction
  )(chip8State)
}
