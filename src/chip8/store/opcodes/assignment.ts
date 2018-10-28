import { Chip8, chip8Selectors } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters } from './helpers'

/*
  0x8XY0
  Sets VX to the value of VY.
*/
export const assignToRegister = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: registerYValue }),
    continueToNextInstruction
  )(chip8State)
}
