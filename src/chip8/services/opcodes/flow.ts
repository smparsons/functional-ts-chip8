import { chip8Selectors } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'

/*
  0x00EE
  Returns from a subroutine.
*/
export const returnFromSubroutine = (chip8State: Chip8): Chip8 => {
  const lastAddressInStack = chip8State.stack[chip8State.stack.length - 1]

  return {
    ...chip8State,
    stack: chip8State.stack.slice(0, -1),
    stackPointer: chip8State.stackPointer - 1,
    programCounter: lastAddressInStack + 0x2
  }
}

/*
  0x1NNN
  Jumps to address NNN.
*/
export const jumpToAddress = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: chip8Selectors.opcodeThreeDigitConstant(chip8State)
})

/*
  0x2NNN
  Calls subroutine at NNN.
*/
export const callSubroutine = (chip8State: Chip8): Chip8 => {
  const newAddress = chip8Selectors.opcodeThreeDigitConstant(chip8State)

  return {
    ...chip8State,
    stack: Uint16Array.from([...Array.from(chip8State.stack), chip8State.programCounter]),
    stackPointer: chip8State.stackPointer + 1,
    programCounter: newAddress
  }
}

/*
  0xBNNN
  Jumps to the address NNN plus V0.
*/
export const jumpToAddressPlusRegisterZero = (chip8State: Chip8): Chip8 => {
  const constant = chip8Selectors.opcodeThreeDigitConstant(chip8State)

  return {
    ...chip8State,
    programCounter: chip8State.vRegisters[0] + constant
  }
}
