import prand from 'pure-rand'
import { parsedOpcodeInitialState } from 'src/chip8/services'
import { chip8InitialState } from 'src/chip8/types'

import {
    bitwiseAnd, bitwiseOr, bitwiseXor, randomBitwiseAnd, shiftLeft, shiftRight
} from './bitwise'

describe('bitwise', () => {
  describe('bitwiseOr', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x24a,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        11: 0xce,
        13: 0xa1
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xb, registerY: 0xd }

    const { programCounter, vRegisters } = bitwiseOr(currentState, parsedOpcode)

    it('stores the result of doing a bitwise or on VX and VY in VX', () => {
      expect(vRegisters[11]).toBe(0xef)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x24c)
    })
  })

  describe('bitwiseAnd', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x28c,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        3: 0x0a,
        7: 0xcf
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x3, registerY: 0x7 }

    const { programCounter, vRegisters } = bitwiseAnd(currentState, parsedOpcode)

    it('stores the result of doing a bitwise and on VX and VY in VX', () => {
      expect(vRegisters[3]).toBe(0xa)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x28e)
    })
  })

  describe('randomBitwiseAnd', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x24d,
      randomGenerator: prand.congruential(1),
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        5: 0xde
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5, twoDigitConstant: 0x23 }

    const { programCounter, vRegisters } = randomBitwiseAnd(currentState, parsedOpcode)

    it('stores the result of doing a bitwise and on a random number and NN', () => {
      expect(vRegisters[5]).toBe(0x21)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x24f)
    })
  })

  describe('bitwiseXor', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x27d,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        5: 0xc1,
        10: 0x0f
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5, registerY: 0xa }

    const { programCounter, vRegisters } = bitwiseXor(currentState, parsedOpcode)

    it('stores the result of doing a bitwise xor on VX and VY in VX', () => {
      expect(vRegisters[5]).toBe(0xce)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x27f)
    })
  })

  describe('shiftRight', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x31e,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        7: 0xb1
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x7, registerY: 0xb }

    const { programCounter, vRegisters } = shiftRight(currentState, parsedOpcode)

    it('stores the least significant bit of VX in VF', () => {
      expect(vRegisters[15]).toBe(0x1)
    })

    it('shifts VX to the right by 1', () => {
      expect(vRegisters[7]).toBe(0x58)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x320)
    })
  })

  describe('shiftLeft', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x812e,
      programCounter: 0x30f,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        1: 0xb7
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x1, registerY: 0x2 }

    const { programCounter, vRegisters } = shiftLeft(currentState, parsedOpcode)

    it('stores the most significant bit of VX in VF', () => {
      expect(vRegisters[15]).toBe(0x1)
    })

    it('shifts VX to the left by 1', () => {
      expect(vRegisters[1]).toBe(0x6e)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x311)
    })
  })
})
