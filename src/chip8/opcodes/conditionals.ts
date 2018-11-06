import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0x3XNN
  Skips the next instruction if VX equals NN. (Usually the next instruction is a jump to 
  skip a code block)
*/
export const registerEqualsConstant = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)
  return {
    ...chip8State,
    programCounter: registerXValue === constant
      ? chip8State.programCounter + 0x4
      : chip8State.programCounter + 0x2
  }
}

/*
  0x4XNN
  Skips the next instruction if VX doesn't equal NN. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registerDoesNotEqualConstant = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const constant = chip8Selectors.opcodeTwoDigitConstant(chip8State)
  return {
    ...chip8State,
    programCounter: registerXValue !== constant
      ? chip8State.programCounter + 0x4
      : chip8State.programCounter + 0x2
  }
}

/*
  0x5XY0
  Skips the next instruction if VX equals VY. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registersAreEqual = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)
  return {
    ...chip8State,
    programCounter: registerXValue === registerYValue
      ? chip8State.programCounter + 0x4
      : chip8State.programCounter + 0x2
  }
}

/*
  0x9XY0
  Skips the next instruction if VX doesn't equal VY. (Usually the next instruction is a 
  jump to skip a code block)
*/
export const registersAreNotEqual = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)
  return {
    ...chip8State,
    programCounter: registerXValue !== registerYValue
      ? chip8State.programCounter + 0x4
      : chip8State.programCounter + 0x2
  }
}
