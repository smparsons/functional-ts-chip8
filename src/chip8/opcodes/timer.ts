import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0xFX07
  Sets VX to the value of the delay timer.
*/
export const setRegisterToDelayTimer = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: chip8State.delayTimer
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0xFX15
  Sets the delay timer to VX.
*/
export const setDelayTimerToRegister = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  delayTimer: chip8Selectors.opcodeRegisterXValue(chip8State),
  programCounter: chip8State.programCounter + 0x2
})

/*
  0xFX18
  Sets the sound timer to VX.
*/
export const setSoundTimerToRegister = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  soundTimer: chip8Selectors.opcodeRegisterXValue(chip8State),
  programCounter: chip8State.programCounter + 0x2
})
