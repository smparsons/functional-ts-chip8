import prand from 'pure-rand'
import { ParsedOpcode } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'

/*
  0x8XY1
  Sets VX to VX or VY. (Bitwise OR operation)
*/
export const bitwiseOr = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] | vRegisters[registerY]
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XY2
  Sets VX to VX and VY. (Bitwise AND operation)
*/
export const bitwiseAnd = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] & vRegisters[registerY]
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0xCXNN
  Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN.
*/
export const randomBitwiseAnd = (
  chip8State: Chip8,
  { registerX, twoDigitConstant }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter, randomGenerator } = chip8State
  const [randomNumber, newRandomGenerator] = prand.uniformIntDistribution(0, 255)(randomGenerator)
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: randomNumber & twoDigitConstant
    }),
    randomGenerator: newRandomGenerator,
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XY3
  Sets VX to VX xor VY.
*/
export const bitwiseXor = (chip8State: Chip8, { registerX, registerY }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] ^ vRegisters[registerY]
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XY6
  Stores the least significant bit of VX in VF and then shifts VX to the right by 1.
*/
export const shiftRight = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] >>> 1,
      [0xf]: vRegisters[registerX] & 0x1
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0x8XYE
  Stores the most significant bit of VX in VF and then shifts VX to the left by 1.
*/
export const shiftLeft = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    vRegisters: Object.assign(Uint8Array.from({ length: 16 }), vRegisters, {
      [registerX]: vRegisters[registerX] << 1,
      [0xf]: vRegisters[registerX] >>> 7
    }),
    programCounter: programCounter + 0x2
  }
}
