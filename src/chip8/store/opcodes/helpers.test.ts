import { chip8InitialState } from 'src/chip8/store'

import {
    continueToNextInstruction, loadRegisters, skipNextInstruction, skipNextInstructionIf
} from './helpers'

describe('helpers', () => {
  describe('continueToNextInstruction', () => {
    it('increments program counter by two', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x2a0
      }

      const { programCounter } = continueToNextInstruction(currentState)

      expect(programCounter).toBe(0x2a2)
    })
  })

  describe('skipNextInstruction', () => {
    it('increments program counter by four', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x3a0
      }

      const { programCounter } = skipNextInstruction(currentState)

      expect(programCounter).toBe(0x3a4)
    })
  })

  describe('skipNextInstructionIf', () => {
    it('increments program counter by four if value passed in is true', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x25f
      }

      const { programCounter } = skipNextInstructionIf(true)(currentState)

      expect(programCounter).toBe(0x263)
    })

    it('increments program counter by two if value passed in is false', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x42a
      }

      const { programCounter } = skipNextInstructionIf(false)(currentState)

      expect(programCounter).toBe(0x42c)
    })
  })

  describe('loadRegisters', () => {
    it('loads passed values into vRegisters', () => {
      const { vRegisters } = loadRegisters({ 3: 0xac, 10: 0xdb, 14: 0x05 })(
        chip8InitialState
      )

      expect(vRegisters[3]).toBe(0xac)
      expect(vRegisters[10]).toBe(0xdb)
      expect(vRegisters[14]).toBe(0x05)
    })
  })
})
