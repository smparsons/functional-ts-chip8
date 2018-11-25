import { ParsedOpcode } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'

/*
  0xFX07
  Sets VX to the value of the delay timer.
*/
export const setRegisterToDelayTimer = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, delayTimer, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: delayTimer
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX15
  Sets the delay timer to VX.
*/
export const setDelayTimerToRegister = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    delayTimer: vRegisters[registerX],
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX18
  Sets the sound timer to VX.
*/
export const setSoundTimerToRegister = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    soundTimer: vRegisters[registerX],
    programCounter: programCounter + 0x2
  }
}
