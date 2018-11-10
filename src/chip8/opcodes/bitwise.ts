import { chip8Selectors } from 'src/chip8/store'
import { Chip8, OpcodeFunc } from 'src/chip8/types'

/*
  0x8XY1
  Sets VX to VX or VY. (Bitwise OR operation)
*/
export const bitwiseOr = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerXValue | registerYValue
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XY2
  Sets VX to VX and VY. (Bitwise AND operation)
*/
export const bitwiseAnd = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerXValue & registerYValue
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0xCXNN
  Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.
*/
export const randomBitwiseAnd = (randomNumber: number): OpcodeFunc => (
  chip8State: Chip8
): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const twoDigitConstant = chip8Selectors.opcodeTwoDigitConstant(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: randomNumber & twoDigitConstant
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XY3
  Sets VX to VX xor VY.
*/
export const bitwiseXor = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  const registerYValue = chip8Selectors.opcodeRegisterYValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerXValue ^ registerYValue
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XY6
  Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
*/
export const shiftRight = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerXValue >>> 1,
      [0xf]: registerXValue & 0x1
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}

/*
  0x8XYE
  Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
*/
export const shiftLeft = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)

  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
      [registerXNumber]: registerXValue << 1,
      [0xf]: registerXValue >>> 7
    }),
    programCounter: chip8State.programCounter + 0x2
  }
}
