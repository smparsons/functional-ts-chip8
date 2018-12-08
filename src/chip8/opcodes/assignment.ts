import { Chip8, ParsedOpcode } from 'src/chip8/types'

/*
  0x8XY0
  Sets VX to the value of VY.
*/
export const assignToRegister = (
  chip8State: Chip8,
  { registerX, registerY }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerY]
    }),
    programCounter: programCounter + 0x2
  }
}
