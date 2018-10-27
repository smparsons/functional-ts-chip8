import { OpcodeFunc, ParsedOpcode } from 'src/chip8/store'

import { skipNextInstructionIf, withParsedOpcode } from './helpers'

/*
  0x3XNN
  Skips the next instruction if VX equals NN. (Usually the next instruction is a jump to 
  skip a code block)
*/
export const registerEqualsConstant = withParsedOpcode(
  ({ registerXValue, twoDigitConstant }: ParsedOpcode): OpcodeFunc =>
    skipNextInstructionIf(registerXValue === twoDigitConstant)
)

/*
  0x4XNN
  Skips the next instruction if VX doesn't equal NN. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registerDoesNotEqualConstant = withParsedOpcode(
  ({ registerXValue, twoDigitConstant }: ParsedOpcode): OpcodeFunc =>
    skipNextInstructionIf(registerXValue !== twoDigitConstant)
)

/*
  0x5XY0
  Skips the next instruction if VX equals VY. (Usually the next instruction is a jump 
  to skip a code block)
*/
export const registersAreEqual = withParsedOpcode(
  ({ registerXValue, registerYValue }: ParsedOpcode): OpcodeFunc =>
    skipNextInstructionIf(registerXValue === registerYValue)
)

/*
  0x9XY0
  Skips the next instruction if VX doesn't equal VY. (Usually the next instruction is a 
  jump to skip a code block)
*/
export const registersAreNotEqual = withParsedOpcode(
  ({ registerXValue, registerYValue }: ParsedOpcode): OpcodeFunc =>
    skipNextInstructionIf(registerXValue !== registerYValue)
)
