import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

import { setDelayTimerToRegister, setRegisterToDelayTimer, setSoundTimerToRegister } from './timer'

describe('timer', () => {
  describe('setRegisterToDelayTimer', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x27d,
      delayTimer: 0x13,
      vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
        2: 0x4a
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x2 }

    const { vRegisters, programCounter } = setRegisterToDelayTimer(currentState, parsedOpcode)

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
      programCounter: 0x232,
      delayTimer: 0x4b,
      vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
        5: 0x51
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5 }

    const { delayTimer, programCounter } = setDelayTimerToRegister(currentState, parsedOpcode)

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
      programCounter: 0x280,
      soundTimer: 0x2c,
      vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
        10: 0x3c
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xa }

    const { soundTimer, programCounter } = setSoundTimerToRegister(currentState, parsedOpcode)

    it('sets delay timer to value stored in VX', () => {
      expect(soundTimer).toBe(0x3c)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x282)
    })
  })
})
