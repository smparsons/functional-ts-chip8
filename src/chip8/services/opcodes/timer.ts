import { Chip8 } from 'src/chip8/types'

import { parseOpcode } from './helpers'

/*
  0xFX07
  Sets VX to the value of the delay timer.
*/
export const setRegisterToDelayTimer = (chip8State: Chip8): Chip8 => {
  const { vRegisters, delayTimer, programCounter, opcode } = chip8State
  const { registerX } = parseOpcode(opcode)

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
export const setDelayTimerToRegister = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX } = parseOpcode(opcode)

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
export const setSoundTimerToRegister = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX } = parseOpcode(opcode)

  return {
    ...chip8State,
    soundTimer: vRegisters[registerX],
    programCounter: programCounter + 0x2
  }
}
