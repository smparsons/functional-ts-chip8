import { parsedOpcodeInitialState } from 'src/chip8/services'
import { chip8InitialState } from 'src/chip8/types'

import {
    addRegisterXToIndexRegister, registerDump, registerLoad, setIndexRegisterToAddress, storeBCD,
    storeSpriteLocation
} from './memory'

describe('memory', () => {
  describe('setIndexRegisterToAddress', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x2ac
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, threeDigitConstant: 0x2f0 }

    const { indexRegister, programCounter } = setIndexRegisterToAddress(currentState, parsedOpcode)

    it('sets index register to three digit address NNN', () => {
      expect(indexRegister).toBe(0x2f0)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x2ae)
    })
  })

  describe('addRegisterXToIndexRegister', () => {
    const currentState = {
      ...chip8InitialState,
      indexRegister: 0x2bf,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        12: 0x5c
      }),
      programCounter: 0x2fd
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc }

    const { indexRegister, programCounter } = addRegisterXToIndexRegister(
      currentState,
      parsedOpcode
    )

    it('adds register x to index register', () => {
      expect(indexRegister).toBe(0x31b)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x2ff)
    })
  })

  describe('registerDump', () => {
    const currentState = {
      ...chip8InitialState,
      indexRegister: 0x1ac,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        0: 0x13,
        1: 0x2a,
        2: 0x5c,
        3: 0x4d,
        4: 0x3c,
        5: 0xad,
        6: 0xbc,
        7: 0x54
      }),
      programCounter: 0x3cc
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x7 }

    const { memory, programCounter } = registerDump(currentState, parsedOpcode)

    it('updates memory at address I through address I + X', () => {
      const numberOfBytesToSlice = 8
      const memorySliceStart = 0x1ac
      const memorySlice = memory.slice(memorySliceStart, memorySliceStart + numberOfBytesToSlice)
      expect(memorySlice).toEqual(Uint8Array.from([0x13, 0x2a, 0x5c, 0x4d, 0x3c, 0xad, 0xbc, 0x54]))
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x3ce)
    })
  })

  describe('registerLoad', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0xf565,
      indexRegister: 0x20c,
      memory: Object.assign(Uint8Array.from({ length: 4096 }), chip8InitialState.memory, {
        [0x20c]: 0x7a,
        [0x20d]: 0xc1,
        [0x20e]: 0x3b,
        [0x20f]: 0x11,
        [0x210]: 0x9c,
        [0x211]: 0xde
      }),
      programCounter: 0x13f
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5 }

    const { programCounter, vRegisters } = registerLoad(currentState, parsedOpcode)

    it('updates registers 0 through X with values in memory at address I through I + X', () => {
      const numberOfRegistersToSlice = 6
      const registersSlice = vRegisters.slice(0, numberOfRegistersToSlice)
      expect(registersSlice).toEqual(Uint8Array.from([0x7a, 0xc1, 0x3b, 0x11, 0x9c, 0xde]))
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x141)
    })
  })

  describe('storeBCD', () => {
    const currentState = {
      ...chip8InitialState,
      indexRegister: 0x17b,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        7: 0xaf
      }),
      programCounter: 0x232
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x7 }

    const { memory, programCounter } = storeBCD(currentState, parsedOpcode)

    it('updates memory at location I, I + 1, and I + 2 with the BCD representation of register X', () => {
      const numberOfBytesToSlice = 3
      const memorySliceStart = 0x17b
      const memorySlice = memory.slice(memorySliceStart, memorySliceStart + numberOfBytesToSlice)
      expect(memorySlice).toEqual(Uint8Array.from([0x1, 0x7, 0x5]))
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x234)
    })
  })

  describe('storeSpriteLocation', () => {
    const currentState = {
      ...chip8InitialState,
      indexRegister: 0x213,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        5: 0xa
      }),
      programCounter: 0x240
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5 }

    const { indexRegister, programCounter } = storeSpriteLocation(currentState, parsedOpcode)

    it('updates I to the location of the 4x5 font representation of the character in X', () => {
      expect(indexRegister).toBe(0x32)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x242)
    })
  })
})
