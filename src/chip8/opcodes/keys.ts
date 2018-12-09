import { Chip8, KeyState, ParsedOpcode } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

/*
  0xEX9E
  Skips the next instruction if the key stored in VX is pressed. (Usually the next instruction 
  is a jump to skip a code block)
*/
export const keyIsPressed = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { keyState, programCounter, vRegisters } = chip8State
  return {
    ...chip8State,
    programCounter: keyState[vRegisters[registerX]] === KeyState.Pressed ? programCounter + 0x4 : programCounter + 0x2
  }
}

/*
  0xEXA1
  Skips the next instruction if the key stored in VX isn't pressed. (Usually the next instruction 
  is a jump to skip a code block)
*/
export const keyIsNotPressed = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { keyState, programCounter, vRegisters } = chip8State
  return {
    ...chip8State,
    programCounter: keyState[vRegisters[registerX]] === KeyState.Released ? programCounter + 0x4 : programCounter + 0x2
  }
}

/*
  0xFX0A
  A key press is awaited, and then stored in VX. (Blocking Operation. All instruction halted 
  until next key event)
*/
export const awaitKeyPress = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { keyState, programCounter, vRegisters } = chip8State
  const pressedKey = keyState.findIndex(key => key === KeyState.Pressed)

  return pressedKey !== -1
    ? {
        ...chip8State,
        vRegisters: updateUint8Array(vRegisters, {
          [registerX]: pressedKey
        }),
        programCounter: programCounter + 0x2
      }
    : chip8State
}
