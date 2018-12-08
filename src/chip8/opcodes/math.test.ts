import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'

import { addTwoRegisters, registerXMinusRegisterY, registerYMinusRegisterX } from './math'

describe('math', () => {
  describe('addTwoRegisters', () => {
    describe('when carry', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x25d,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          7: 0xce,
          10: 0xa1
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x7, registerY: 0xa }

      const { programCounter, vRegisters } = addTwoRegisters(currentState, parsedOpcode)

      it('stores VX + VY in VX', () => {
        expect(vRegisters[7]).toBe(0x6f)
      })

      it('stores 1 in carry register', () => {
        expect(vRegisters[15]).toBe(1)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x25f)
      })
    })

    describe('when no carry', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x82b4,
        programCounter: 0x29b,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          2: 0x2b,
          11: 0x1f
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x2, registerY: 0xb }

      const { programCounter, vRegisters } = addTwoRegisters(currentState, parsedOpcode)

      it('stores VX + VY in VX', () => {
        expect(vRegisters[2]).toBe(0x4a)
      })

      it('stores 0 in carry register', () => {
        expect(vRegisters[15]).toBe(0)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x29d)
      })
    })
  })

  describe('registerXMinusRegisterY', () => {
    describe('when borrow', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x82d5,
        programCounter: 0x29c,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          2: 0x1e,
          13: 0xa2
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x2, registerY: 0xd }

      const { programCounter, vRegisters } = registerXMinusRegisterY(currentState, parsedOpcode)

      it('stores VX - VY in VX', () => {
        expect(vRegisters[2]).toBe(0x7c)
      })

      it('stores 0 in carry register', () => {
        expect(vRegisters[15]).toBe(0)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x29e)
      })
    })

    describe('when no borrow', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8ef5,
        programCounter: 0x21f,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          14: 0xc2,
          15: 0xa1
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xe, registerY: 0xf }

      const { programCounter, vRegisters } = registerXMinusRegisterY(currentState, parsedOpcode)

      it('stores VX - VY in VX', () => {
        expect(vRegisters[14]).toBe(0x21)
      })

      it('stores 1 in carry register', () => {
        expect(vRegisters[15]).toBe(1)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x221)
      })
    })
  })

  describe('registerYMinusRegisterX', () => {
    describe('when borrow', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8a77,
        programCounter: 0x222,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          10: 0x7a,
          7: 0x5b
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xa, registerY: 0x7 }

      const { programCounter, vRegisters } = registerYMinusRegisterX(currentState, parsedOpcode)

      it('stores VY - VX in VX', () => {
        expect(vRegisters[10]).toBe(0xe1)
      })

      it('stores 0 in carry register', () => {
        expect(vRegisters[15]).toBe(0)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x224)
      })
    })

    describe('when no borrow', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0x8cb7,
        programCounter: 0x200,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          12: 0x8f,
          11: 0xd3
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc, registerY: 0xb }

      const { programCounter, vRegisters } = registerYMinusRegisterX(currentState, parsedOpcode)

      it('stores VY - VX in VX', () => {
        expect(vRegisters[12]).toBe(0x44)
      })

      it('stores 1 in carry register', () => {
        expect(vRegisters[15]).toBe(1)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x202)
      })
    })
  })
})
