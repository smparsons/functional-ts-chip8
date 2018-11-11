import { chip8InitialState } from 'src/chip8/types'

import { chip8Selectors } from './selectors'

describe('chip8Selectors', () => {
  describe('registerXNumber', () => {
    it('parses register x from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8ce4
      }

      const registerXNumber = chip8Selectors.opcodeRegisterXNumber(currentState)

      expect(registerXNumber).toBe(0xc)
    })
  })

  describe('registerYNumber', () => {
    it('parses register y from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8ce4
      }

      const registerYNumber = chip8Selectors.opcodeRegisterYNumber(currentState)

      expect(registerYNumber).toBe(0xe)
    })
  })

  describe('registerXValue', () => {
    it('gets the value stored in register x', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8574,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          5: 0xa1
        })
      }

      const registerXValue = chip8Selectors.opcodeRegisterXValue(currentState)

      expect(registerXValue).toBe(0xa1)
    })
  })

  describe('registerYValue', () => {
    it('gets the value stored in register y', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x5300,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          0: 0xcd
        })
      }

      const registerYValue = chip8Selectors.opcodeRegisterYValue(currentState)

      expect(registerYValue).toBe(0xcd)
    })
  })

  describe('oneDigitConstant', () => {
    it('parses one digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0xd7e2
      }

      const oneDigitConstant = chip8Selectors.opcodeOneDigitConstant(currentState)

      expect(oneDigitConstant).toBe(0x2)
    })
  })

  describe('twoDigitConstant', () => {
    it('parses two digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x6f2e
      }

      const twoDigitConstant = chip8Selectors.opcodeTwoDigitConstant(currentState)

      expect(twoDigitConstant).toBe(0x2e)
    })
  })

  describe('threeDigitConstant', () => {
    it('parses three digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x2a1c
      }

      const threeDigitConstant = chip8Selectors.opcodeThreeDigitConstant(currentState)

      expect(threeDigitConstant).toBe(0xa1c)
    })
  })
})
