import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'

import { addConstantToRegister, setRegisterToConstant } from './constant'

describe('constant', () => {
  describe('setRegisterToConstant', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x180,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        [0xc]: 0x5a
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc, twoDigitConstant: 0x23 }

    const { programCounter, vRegisters } = setRegisterToConstant(currentState, parsedOpcode)

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
      programCounter: 0x210,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        [0xe]: 0x15
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xe, twoDigitConstant: 0xa2 }

    const { programCounter, vRegisters } = addConstantToRegister(currentState, parsedOpcode)

    it('adds NN to VX', () => {
      expect(vRegisters[0xe]).toBe(0xb7)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x212)
    })
  })
})
