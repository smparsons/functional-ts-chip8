import { Chip8, chip8Selectors, OpcodeFunc } from 'src/chip8/store'
import { pipe } from 'src/functionalUtilities'

const updateStack = (stack: Uint16Array): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  stack
})

const updateStackPointer = (stackPointer: number): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  stackPointer
})

const updateProgramCounter = (newAddress: number): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: newAddress
})

/*
  0x00EE
  Returns from a subroutine.
*/
export const returnFromSubroutine = (chip8State: Chip8): Chip8 => {
  const lastAddressInStack = chip8State.stack[chip8State.stack.length - 1]

  return pipe(
    updateStack(chip8State.stack.slice(0, -1)),
    updateStackPointer(chip8State.stackPointer - 1),
    updateProgramCounter(lastAddressInStack + 0x2)
  )(chip8State)
}

/*
  0x1NNN
  Jumps to address NNN.
*/
export const jumpToAddress = (chip8State: Chip8): Chip8 => {
  const newAddress = chip8Selectors.opcodeThreeDigitConstant(chip8State)
  return updateProgramCounter(newAddress)(chip8State)
}

/*
  0x2NNN
  Calls subroutine at NNN.
*/
export const callSubroutine = (chip8State: Chip8): Chip8 => {
  const newAddress = chip8Selectors.opcodeThreeDigitConstant(chip8State)

  return pipe(
    updateStack(Uint16Array.from([...Array.from(chip8State.stack), chip8State.programCounter])),
    updateStackPointer(chip8State.stackPointer + 1),
    updateProgramCounter(newAddress)
  )(chip8State)
}

/*
  0xBNNN
  Jumps to the address NNN plus V0.
*/
export const jumpToAddressPlusRegisterZero = (chip8State: Chip8): Chip8 => {
  const constant = chip8Selectors.opcodeThreeDigitConstant(chip8State)
  return updateProgramCounter(chip8State.vRegisters[0] + constant)(chip8State)
}
