import { chip8Selectors } from './selectors'
import { chip8InitialState } from './types'

describe('chip8Selectors', () => {
  describe('opcodeRegisterXNumber', () => {
    it('parses register x from opcode', () => {
      expect(
        chip8Selectors.opcodeRegisterXNumber({
          ...chip8InitialState,
          opcode: 0x8ce4
        })
      ).toBe(0xc)
    })
  })

  describe('opcodeRegisterYNumber', () => {
    it('parses register y from opcode', () => {
      expect(
        chip8Selectors.opcodeRegisterYNumber({
          ...chip8InitialState,
          opcode: 0x8ce4
        })
      ).toBe(0xe)
    })
  })

  describe('opcodeRegisterXValue', () => {
    it('gets the value stored in register x', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8574,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, { 5: 0xa1 })
      }

      const registerXValue = chip8Selectors.opcodeRegisterXValue(currentState)

      expect(registerXValue).toBe(0xa1)
    })
  })

  describe('opcodeRegisterYValue', () => {
    it('gets the value stored in register y', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x5300,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, { 0: 0xcd })
      }

      const registerYValue = chip8Selectors.opcodeRegisterYValue(currentState)

      expect(registerYValue).toBe(0xcd)
    })
  })

  describe('opcodeOneDigitConstant', () => {
    it('parses one digit constant from opcode', () => {
      expect(
        chip8Selectors.opcodeOneDigitConstant({
          ...chip8InitialState,
          opcode: 0xd7e2
        })
      ).toBe(0x2)
    })
  })

  describe('opcodeTwoDigitContant', () => {
    it('parses two digit constant from opcode', () => {
      expect(
        chip8Selectors.opcodeTwoDigitConstant({
          ...chip8InitialState,
          opcode: 0x6f2e
        })
      ).toBe(0x2e)
    })
  })

  describe('opcodeThreeDigitConstant', () => {
    it('parses three digit constant from opcode', () => {
      expect(
        chip8Selectors.opcodeThreeDigitConstant({
          ...chip8InitialState,
          opcode: 0x2a1c
        })
      ).toBe(0xa1c)
    })
  })
})
