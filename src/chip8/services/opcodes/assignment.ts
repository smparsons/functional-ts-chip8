import { Chip8 } from 'src/chip8/types'

import { parseOpcode } from './helpers'

/*
  0x8XY0
  Sets VX to the value of VY.
*/
export const assignToRegister = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, registerY } = parseOpcode(opcode)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerY]
    }),
    programCounter: programCounter + 0x2
  }
}
