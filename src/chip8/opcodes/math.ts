import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0x8XY4
  Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there isn't.
*/
export const addTwoRegisters = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(chip8State.vRegisters, {
      [registerXNumber]: registerXValue + registerYValue,
      [0xf]: registerYValue > 0xff - registerXValue ? 0x1 : 0x0
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XY5
  VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerXMinusRegisterY = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(chip8State.vRegisters, {
      [registerXNumber]: registerXValue - registerYValue,
      [0xf]: registerYValue > registerXValue ? 0x0 : 0x1
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XY7
  Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
*/
export const registerYMinusRegisterX = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(chip8State.vRegisters, {
      [registerXNumber]: registerYValue - registerXValue,
      [0xf]: registerXValue > registerYValue ? 0x0 : 0x1
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}
