import { parsedOpcodeInitialState } from 'src/chip8/services'
import { chip8InitialState, KeyState } from 'src/chip8/types'

import { awaitKeyPress, keyIsNotPressed, keyIsPressed } from './keys'

describe('keys', () => {
  describe('keyIsPressed', () => {
    describe('when key is pressed', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x200,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          10: 0xc
        }),
        keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
          12: KeyState.Pressed
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xa }

      const { programCounter } = keyIsPressed(currentState, parsedOpcode)

      it('increments program counter by four', () => {
        expect(programCounter).toBe(0x204)
      })
    })

    describe('when key is not pressed', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x250,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          5: 0xa
        }),
        keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
          10: KeyState.Released
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x5 }

      const { programCounter } = keyIsPressed(currentState, parsedOpcode)

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x252)
      })
    })
  })

  describe('keyIsNotPressed', () => {
    describe('when key is not pressed', () => {
      const currentState = {
        ...chip8InitialState,
        opcode: 0xe7a1,
        programCounter: 0x220,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          7: 0x1
        }),
        keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
          1: KeyState.Released
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x7 }

      const { programCounter } = keyIsNotPressed(currentState, parsedOpcode)

      it('increments program counter by four', () => {
        expect(programCounter).toBe(0x224)
      })
    })

    describe('when key is pressed', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x27a,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          2: 0xd
        }),
        keyState: Object.assign([], chip8InitialState.keyState, {
          13: KeyState.Pressed
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x2 }

      const { programCounter } = keyIsNotPressed(currentState, parsedOpcode)

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x27c)
      })
    })
  })

  describe('awaitKeyPress', () => {
    describe('when no keys are pressed', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x280,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          6: 0x3b
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x6 }

      const { programCounter, vRegisters } = awaitKeyPress(currentState, parsedOpcode)

      it('leaves register untouched', () => {
        expect(vRegisters[6]).toBe(0x3b)
      })

      it('does not increment the program counter', () => {
        expect(programCounter).toBe(0x280)
      })
    })

    describe('when key is pressed', () => {
      const currentState = {
        ...chip8InitialState,
        programCounter: 0x312,
        vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
          9: 0x7c
        }),
        keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
          3: KeyState.Pressed
        })
      }

      const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0x9 }

      const { programCounter, vRegisters } = awaitKeyPress(currentState, parsedOpcode)

      it('stores key press in register', () => {
        expect(vRegisters[9]).toBe(0x3)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x314)
      })
    })
  })
})
