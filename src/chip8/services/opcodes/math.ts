import { Chip8 } from 'src/chip8/types'

import { parseOpcode } from './helpers'

/*
  0x8XY4
  Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.
*/
export const addTwoRegisters = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, registerY } = parseOpcode(opcode)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] + vRegisters[registerY],
      [0xf]: vRegisters[registerY] > 0xff - vRegisters[registerX] ? 0x1 : 0x0
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XY5
  VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerXMinusRegisterY = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, registerY } = parseOpcode(opcode)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] - vRegisters[registerY],
      [0xf]: vRegisters[registerY] > vRegisters[registerX] ? 0x0 : 0x1
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XY7
  Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerYMinusRegisterX = (chip8State: Chip8): Chip8 => {
  const { vRegisters, programCounter, opcode } = chip8State
  const { registerX, registerY } = parseOpcode(opcode)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerY] - vRegisters[registerX],
      [0xf]: vRegisters[registerX] > vRegisters[registerY] ? 0x0 : 0x1
    }),
    programCounter: programCounter + 0x2
  }
}
