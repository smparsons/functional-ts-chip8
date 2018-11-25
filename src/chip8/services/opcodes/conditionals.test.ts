import { parsedOpcodeInitialState } from 'src/chip8/services'
import { chip8InitialState } from 'src/chip8/types'

import {
    registerDoesNotEqualConstant, registerEqualsConstant, registersAreEqual, registersAreNotEqual
} from './conditionals'

describe('conditionals', () => {
  describe('registerEqualsConstant', () => {
    it('skips next instruction when register x and constant are equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x25b,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          10: 0x23
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xa, twoDigitConstant: 0x23 }

      const { programCounter } = registerEqualsConstant(currentState, parsedOpcode)

      expect(programCounter).toBe(0x25f)
    })

    it('continues to next instruction when register x and constant are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x2d4,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          12: 0xe1
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc, twoDigitConstant: 0x5a }

      const { programCounter } = registerEqualsConstant(currentState, parsedOpcode)

      expect(programCounter).toBe(0x2d6)
    })
  })

  describe('registerDoesNotEqualConstant', () => {
    it('skips next instruction when register x and constant are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x31c,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          5: 0x6c
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5, twoDigitConstant: 0x6b }

      const { programCounter } = registerDoesNotEqualConstant(currentState, parsedOpcode)

      expect(programCounter).toBe(0x320)
    })

    it('continues to next instruction when register x and constant are equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x23c,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          1: 0xa8
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x1, twoDigitConstant: 0xa8 }

      const { programCounter } = registerDoesNotEqualConstant(currentState, parsedOpcode)

      expect(programCounter).toBe(0x23e)
    })
  })

  describe('registersAreEqual', () => {
    it('skips next instruction when register x and y are equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x21a,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          11: 0x9a,
          13: 0x9a
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xb, registerY: 0xd }

      const { programCounter } = registersAreEqual(currentState, parsedOpcode)

      expect(programCounter).toBe(0x21e)
    })

    it('continues to next instruction when register x and y are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x2ff,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          2: 0xe1,
          12: 0x3c
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x2, registerY: 0xc }

      const { programCounter } = registersAreEqual(currentState, parsedOpcode)

      expect(programCounter).toBe(0x301)
    })
  })

  describe('registersAreNotEqual', () => {
    it('skips next instruction when register x and y are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x231,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          12: 0x4a,
          2: 0x29
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc, registerY: 0x2 }

      const { programCounter } = registersAreNotEqual(currentState, parsedOpcode)

      expect(programCounter).toBe(0x235)
    })

    it('continues to next instruction when register x and y are equal', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x2ee,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          11: 0x7c,
          15: 0x7c
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xb, registerY: 0xf }

      const { programCounter } = registersAreNotEqual(currentState, parsedOpcode)

      expect(programCounter).toBe(0x2f0)
    })
  })
})
