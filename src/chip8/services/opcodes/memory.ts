import { ParsedOpcode } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'

/*
  0xANNN
  Sets I to the address NNN.
*/
export const setIndexRegisterToAddress = (
  chip8State: Chip8,
  { threeDigitConstant }: ParsedOpcode
): Chip8 => {
  const { programCounter } = chip8State
  return {
    ...chip8State,
    indexRegister: threeDigitConstant,
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX1E
  Adds VX to I.
*/
export const addRegisterXToIndexRegister = (
  chip8State: Chip8,
  { registerX }: ParsedOpcode
): Chip8 => {
  const { vRegisters, programCounter, indexRegister } = chip8State
  return {
    ...chip8State,
    indexRegister: indexRegister + vRegisters[registerX],
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX55
  Stores V0 to VX (including VX) in memory starting at address I. The offset from I is increased 
  by 1 for each value written, but I itself is left unmodified.
*/
export const registerDump = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter, indexRegister, memory } = chip8State
  const registersToProcess = Array.from(vRegisters.slice(0, registerX + 1))

  return {
    ...chip8State,
    memory: Object.assign(
      Uint8Array.from({ length: 4096 }),
      memory,
      ...registersToProcess.map((value, index) => ({
        [indexRegister + index]: value
      }))
    ),
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX65
  Fills V0 to VX (including VX) with values from memory starting at address I. The offset from I 
  is increased by 1 for each value written, but I itself is left unmodified.
*/
export const registerLoad = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter, indexRegister, memory } = chip8State
  const numberOfBytesToSlice = registerX + 1
  const memoryValuesToProcess = Array.from(
    memory.slice(indexRegister, indexRegister + numberOfBytesToSlice)
  )

  return {
    ...chip8State,
    vRegisters: Object.assign(
      Uint8Array.from({ length: 16 }),
      vRegisters,
      ...memoryValuesToProcess.map((value, index) => ({ [index]: value }))
    ),
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX33
  Stores the binary-coded decimal representation of VX, with the most significant of three digits 
  at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2. 
  (In other words, take the decimal representation of VX, place the hundreds digit in memory at 
  location in I, the tens digit at location I+1, and the ones digit at location I+2.
*/
export const storeBCD = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter, indexRegister, memory } = chip8State
  return {
    ...chip8State,
    memory: Object.assign(Uint8Array.from({ length: 4096 }), memory, {
      [indexRegister]: vRegisters[registerX] / 100,
      [indexRegister + 1]: (vRegisters[registerX] / 10) % 10,
      [indexRegister + 2]: (vRegisters[registerX] % 100) % 10
    }),
    programCounter: programCounter + 0x2
  }
}

/*
  0xFX29
  Sets I to the location of the sprite for the character in VX. Characters 0-F  (in hexadecimal) 
  are represented by a 4x5 font.
*/
export const storeSpriteLocation = (chip8State: Chip8, { registerX }: ParsedOpcode): Chip8 => {
  const { vRegisters, programCounter } = chip8State
  return {
    ...chip8State,
    indexRegister: vRegisters[registerX] * 0x5,
    programCounter: programCounter + 0x2
  }
}
