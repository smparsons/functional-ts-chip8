import { chip8InitialState } from 'src/chip8/store'

import {
    registerDoesNotEqualConstant, registerEqualsConstant, registersAreEqual, registersAreNotEqual
} from './conditionals'

describe('conditionals', () => {
  describe('registerEqualsConstant', () => {
    it('skips next instruction when register x and constant are equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x3a23,
        programCounter: 0x25b,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          10: 0x23
        })
      }

      const { programCounter } = registerEqualsConstant(currentState)

      expect(programCounter).toBe(0x25f)
    })

    it('continues to next instruction when register x and constant are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x3c5a,
        programCounter: 0x2d4,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          12: 0xe1
        })
      }

      const { programCounter } = registerEqualsConstant(currentState)

      expect(programCounter).toBe(0x2d6)
    })
  })

  describe('registerDoesNotEqualConstant', () => {
    it('skips next instruction when register x and constant are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x456b,
        programCounter: 0x31c,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          5: 0x6c
        })
      }

      const { programCounter } = registerDoesNotEqualConstant(currentState)

      expect(programCounter).toBe(0x320)
    })

    it('continues to next instruction when register x and constant are equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x41a8,
        programCounter: 0x23c,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          1: 0xa8
        })
      }

      const { programCounter } = registerDoesNotEqualConstant(currentState)

      expect(programCounter).toBe(0x23e)
    })
  })

  describe('registersAreEqual', () => {
    it('skips next instruction when register x and y are equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x5bd0,
        programCounter: 0x21a,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          11: 0x9a,
          13: 0x9a
        })
      }

      const { programCounter } = registersAreEqual(currentState)

      expect(programCounter).toBe(0x21e)
    })

    it('continues to next instruction when register x and y are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x52c0,
        programCounter: 0x2ff,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          2: 0xe1,
          12: 0x3c
        })
      }

      const { programCounter } = registersAreEqual(currentState)

      expect(programCounter).toBe(0x301)
    })
  })

  describe('registersAreNotEqual', () => {
    it('skips next instruction when register x and y are not equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x9c20,
        programCounter: 0x231,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          12: 0x4a,
          2: 0x29
        })
      }

      const { programCounter } = registersAreNotEqual(currentState)

      expect(programCounter).toBe(0x235)
    })

    it('continues to next instruction when register x and y are equal', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x9bf0,
        programCounter: 0x2ee,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, {
          11: 0x7c,
          15: 0x7c
        })
      }

      const { programCounter } = registersAreNotEqual(currentState)

      expect(programCounter).toBe(0x2f0)
    })
  })
})
