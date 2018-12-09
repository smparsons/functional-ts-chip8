import { Chip8, ParsedOpcode } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

/*
  0x8XY4
  Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.
*/
export const addTwoRegisters = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: updateUint8Array(vRegisters, {
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
export const registerXMinusRegisterY = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: updateUint8Array(vRegisters, {
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
export const registerYMinusRegisterX = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: updateUint8Array(vRegisters, {
      [registerX]: vRegisters[registerY] - vRegisters[registerX],
      [0xf]: vRegisters[registerX] > vRegisters[registerY] ? 0x0 : 0x1
    }),
    programCounter: programCounter + 0x2
  }
}
