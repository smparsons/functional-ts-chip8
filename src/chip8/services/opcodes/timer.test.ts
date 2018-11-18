import { chip8InitialState } from 'src/chip8/types'

import { setDelayTimerToRegister, setRegisterToDelayTimer, setSoundTimerToRegister } from './timer'

describe('timer', () => {
  describe('setRegisterToDelayTimer', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0xf207,
      programCounter: 0x27d,
      delayTimer: 0x13,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        2: 0x4a
      })
    }

    const { vRegisters, programCounter } = setRegisterToDelayTimer(currentState)

    it('sets delay timer to value stored in VX', () => {
      expect(vRegisters[2]).toBe(0x13)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x27f)
    })
  })

  describe('setDelayTimerToRegister', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0xf515,
      programCounter: 0x232,
      delayTimer: 0x4b,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        5: 0x51
      })
    }

    const { delayTimer, programCounter } = setDelayTimerToRegister(currentState)

    it('sets delay timer to value stored in VX', () => {
      expect(delayTimer).toBe(0x51)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x234)
    })
  })

  describe('setSoundTimerToRegister', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0xfa18,
      programCounter: 0x280,
      soundTimer: 0x2c,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        10: 0x3c
      })
    }

    const { soundTimer, programCounter } = setSoundTimerToRegister(currentState)

    it('sets delay timer to value stored in VX', () => {
      expect(soundTimer).toBe(0x3c)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x282)
    })
  })
})