import { Func1 } from 'redux'
import { Chip8, ParsedOpcode } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters, withParsedOpcode } from './helpers'

/*
  0x8XY1
  Sets VX to VX or VY. (Bitwise OR operation)
*/
export const bitwiseOr = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode) =>
    pipe(
      loadRegisters({ [registerXNumber]: registerXValue | registerYValue }),
      continueToNextInstruction
    )
)

/*
  0x8XY2
  Sets VX to VX and VY. (Bitwise AND operation)
*/
export const bitwiseAnd = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode) =>
    pipe(
      loadRegisters({ [registerXNumber]: registerXValue & registerYValue }),
      continueToNextInstruction
    )
)

/*
  0xCXNN
  Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.
*/
export const randomBitwiseAnd = (randomNumber: number): Func1<Chip8, Chip8> =>
  withParsedOpcode(({ registerXNumber, twoDigitConstant }: ParsedOpcode) =>
    pipe(
      loadRegisters({ [registerXNumber]: randomNumber & twoDigitConstant }),
      continueToNextInstruction
    )
  )

/*
  0x8XY3
  Sets VX to VX xor VY.
*/
export const bitwiseXor = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode) =>
    pipe(
      loadRegisters({ [registerXNumber]: registerXValue ^ registerYValue }),
      continueToNextInstruction
    )
)

/*
  0x8XY6
  Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
*/
export const shiftRight = withParsedOpcode(({ registerXNumber, registerXValue }: ParsedOpcode) =>
  pipe(
    loadRegisters({
      [registerXNumber]: registerXValue >>> 1,
      [0xf]: registerXValue & 0x1
    }),
    continueToNextInstruction
  )
)

/*
  0x8XYE
  Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
*/
export const shiftLeft = withParsedOpcode(({ registerXNumber, registerXValue }: ParsedOpcode) =>
  pipe(
    loadRegisters({
      [registerXNumber]: registerXValue << 1,
      [0xf]: registerXValue >>> 7
    }),
    continueToNextInstruction
  )
)
