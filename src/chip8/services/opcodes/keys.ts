import { chip8Selectors } from 'src/chip8/store'
import { Chip8, KeyState } from 'src/chip8/types'

/*
  0xEX9E
  Skips the next instruction if the key stored in VX is pressed. (Usually the next instruction 
  is a jump to skip a code block)
*/
export const keyIsPressed = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  return {
    ...chip8State,
    programCounter:
      chip8State.keyState[registerXValue] === KeyState.Pressed
        ? chip8State.programCounter + 0x4
        : chip8State.programCounter + 0x2
  }
}

/*
  0xEXA1
  Skips the next instruction if the key stored in VX isn't pressed. (Usually the next instruction 
  is a jump to skip a code block)
*/
export const keyIsNotPressed = (chip8State: Chip8): Chip8 => {
  const registerXValue = chip8Selectors.opcodeRegisterXValue(chip8State)
  return {
    ...chip8State,
    programCounter:
      chip8State.keyState[registerXValue] === KeyState.Released
        ? chip8State.programCounter + 0x4
        : chip8State.programCounter + 0x2
  }
}

/*
  0xFX0A
  A key press is awaited, and then stored in VX. (Blocking Operation. All instruction halted 
  until next key event)
*/
export const awaitKeyPress = (chip8State: Chip8): Chip8 => {
  const registerXNumber = chip8Selectors.opcodeRegisterXNumber(chip8State)
  const pressedKey = chip8State.keyState.findIndex(key => key === KeyState.Pressed)
  return pressedKey !== -1
    ? {
        ...chip8State,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, {
          [registerXNumber]: pressedKey
        }),
        programCounter: chip8State.programCounter + 0x2
      }
    : chip8State
}
