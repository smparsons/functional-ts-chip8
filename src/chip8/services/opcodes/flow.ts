import { Chip8 } from 'src/chip8/types'

import { parseOpcode } from './helpers'

/*
  0x00EE
  Returns from a subroutine.
*/
export const returnFromSubroutine = (chip8State: Chip8): Chip8 => {
  const { stack, stackPointer } = chip8State
  const lastAddressInStack = stack[stack.length - 1]

  return {
    ...chip8State,
    stack: stack.slice(0, -1),
    stackPointer: stackPointer - 1,
    programCounter: lastAddressInStack + 0x2
  }
}

/*
  0x1NNN
  Jumps to address NNN.
*/
export const jumpToAddress = (chip8State: Chip8): Chip8 => {
  const { threeDigitConstant } = parseOpcode(chip8State.opcode)

  return {
    ...chip8State,
    programCounter: threeDigitConstant
  }
}

/*
  0x2NNN
  Calls subroutine at NNN.
*/
export const callSubroutine = (chip8State: Chip8): Chip8 => {
  const { stack, stackPointer, programCounter, opcode } = chip8State
  const { threeDigitConstant } = parseOpcode(opcode)

  return {
    ...chip8State,
    stack: Uint16Array.from([...Array.from(stack), programCounter]),
    stackPointer: stackPointer + 1,
    programCounter: threeDigitConstant
  }
}

/*
  0xBNNN
  Jumps to the address NNN plus V0.
*/
export const jumpToAddressPlusRegisterZero = (chip8State: Chip8): Chip8 => {
  const { vRegisters, opcode } = chip8State
  const { threeDigitConstant } = parseOpcode(opcode)

  return {
    ...chip8State,
    programCounter: vRegisters[0] + threeDigitConstant
  }
}
