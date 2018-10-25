import { chip8InitialState } from 'src/chip8/store'

import { continueToNextInstruction, skipNextInstruction } from './helpers'

describe('helpers', () => {
  describe('continueToNextInstruction', () => {
    it('increments program counter by two', () => {
      const initialState = {
        ...chip8InitialState,
        programCounter: 0x2a0
      }

      const { programCounter } = continueToNextInstruction(initialState)

      expect(programCounter).toBe(0x2a2)
    })
  })

  describe('skipNextInstruction', () => {
    it('increments program counter by four', () => {
      const initialState = {
        ...chip8InitialState,
        programCounter: 0x3a0
      }

      const { programCounter } = skipNextInstruction(initialState)

      expect(programCounter).toBe(0x3a4)
    })
  })
})
