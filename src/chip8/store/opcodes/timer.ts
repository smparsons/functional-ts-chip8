import { Chip8, chip8Selectors, OpcodeFunc } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

import { continueToNextInstruction, loadRegisters } from './helpers'

const setDelayTimer = (delayTimer: number): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  delayTimer
})

const setSoundTimer = (soundTimer: number): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  soundTimer
})

/*
  0xFX07
  Sets VX to the value of the delay timer.
*/
export const setRegisterToDelayTimer = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)

  return pipe(
    loadRegisters({ [registerXNumber]: chip8State.delayTimer }),
    continueToNextInstruction
  )(chip8State)
}

/*
  0xFX15
  Sets the delay timer to VX.
*/
export const setDelayTimerToRegister = (chip8State: Chip8): Chip8 =>
  pipe(
    setDelayTimer(chip8Selectors.opcodeRegisterXValue(chip8State)),
    continueToNextInstruction
  )(chip8State)

/*
  0xFX18
  Sets the sound timer to VX.
*/
export const setSoundTimerToRegister = (chip8State: Chip8): Chip8 =>
  pipe(
    setSoundTimer(chip8Selectors.opcodeRegisterXValue(chip8State)),
    continueToNextInstruction
  )(chip8State)
