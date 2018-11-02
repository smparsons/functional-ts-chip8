import { chip8InitialState } from 'src/chip8/types'

import { addConstantToRegister, setRegisterToConstant } from './constant'

describe('constant', () => {
  describe('setRegisterToConstant', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x6c23,
      programCounter: 0x180,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, {
        [0xc]: 0x5a
      })
    }

    const { programCounter, vRegisters } = setRegisterToConstant(currentState)

    it('sets VX to NN', () => {
      expect(vRegisters[0xc]).toBe(0x23)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x182)
    })
  })

  describe('addConstantToRegister', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x7ea2,
      programCounter: 0x210,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, {
        [0xe]: 0x15
      })
    }

    const { programCounter, vRegisters } = addConstantToRegister(currentState)

    it('adds NN to VX', () => {
      expect(vRegisters[0xe]).toBe(0xb7)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x212)
    })
  })
})
