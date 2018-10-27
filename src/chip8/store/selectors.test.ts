import { chip8Selectors } from './selectors'
import { chip8InitialState } from './types'

describe('chip8Selectors', () => {
  describe('parsedOpcode', () => {
    it('parses register x from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8ce4
      }

      const { registerXNumber } = chip8Selectors.parsedOpcode(currentState)

      expect(registerXNumber).toBe(0xc)
    })

    it('parses register y from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8ce4
      }

      const { registerYNumber } = chip8Selectors.parsedOpcode(currentState)

      expect(registerYNumber).toBe(0xe)
    })

    it('gets the value stored in register x', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8574,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, { 5: 0xa1 })
      }

      const { registerXValue } = chip8Selectors.parsedOpcode(currentState)

      expect(registerXValue).toBe(0xa1)
    })

    it('gets the value stored in register y', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x5300,
        vRegisters: Object.assign([], chip8InitialState.vRegisters, { 0: 0xcd })
      }

      const { registerYValue } = chip8Selectors.parsedOpcode(currentState)

      expect(registerYValue).toBe(0xcd)
    })

    it('parses one digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0xd7e2
      }

      const { oneDigitConstant } = chip8Selectors.parsedOpcode(currentState)

      expect(oneDigitConstant).toBe(0x2)
    })

    it('parses two digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x6f2e
      }

      const { twoDigitConstant } = chip8Selectors.parsedOpcode(currentState)

      expect(twoDigitConstant).toBe(0x2e)
    })

    it('parses three digit constant from opcode', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x2a1c
      }

      const { threeDigitConstant } = chip8Selectors.parsedOpcode(currentState)

      expect(threeDigitConstant).toBe(0xa1c)
    })
  })
})
