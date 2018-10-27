import { OpcodeFunc, ParsedOpcode } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters, withParsedOpcode } from './helpers'

/*
  0x8XY4
  Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.
*/
export const addTwoRegisters = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode): OpcodeFunc =>
    pipe(
      loadRegisters({
        [registerXNumber]: registerXValue + registerYValue,
        [0xf]: registerYValue > 0xff - registerXValue ? 0x1 : 0x0
      }),
      continueToNextInstruction
    )
)

/*
  0x8XY5
  VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerXMinusRegisterY = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode): OpcodeFunc =>
    pipe(
      loadRegisters({
        [registerXNumber]: registerXValue - registerYValue,
        [0xf]: registerYValue > registerXValue ? 0x0 : 0x1
      }),
      continueToNextInstruction
    )
)

/*
  0x8XY7
  Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerYMinusRegisterX = withParsedOpcode(
  ({ registerXNumber, registerXValue, registerYValue }: ParsedOpcode): OpcodeFunc =>
    pipe(
      loadRegisters({
        [registerXNumber]: registerYValue - registerXValue,
        [0xf]: registerXValue > registerYValue ? 0x0 : 0x1
      }),
      continueToNextInstruction
    )
)
