import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0x8XY0
  Sets VX to the value of VY.
*/
export const assignToRegister = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerYValue
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}
