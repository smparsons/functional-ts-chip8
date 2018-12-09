import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'
import { updateUint8Array } from 'src/functional'

import { clearScreen, drawGraphics } from './graphics'

describe('graphics', () => {
  describe('clearScreen', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x2d2,
      graphics: Uint8Array.from({ length: 2048 }, () => 0x1)
    }

    const { programCounter, graphics } = clearScreen(currentState)

    it('clears the screen', () => {
      expect(graphics).toEqual(Uint8Array.from({ length: 2048 }))
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x2d4)
    })
  })

  describe('drawGraphics', () => {
    describe('when drawing on clear screen', () => {
      const currentState = {
        ...chip8InitialState,
        indexRegister: 0x3ac,
        memory: updateUint8Array(chip8InitialState.memory, {
          [0x3ac]: 0x25,
          [0x3ad]: 0x3c,
          [0x3ae]: 0xfd
        }),
        vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
          [0x7]: 0x13,
          [0xb]: 0xa,
          [0xf]: 0x0
        }),
        programCounter: 0x2f0
      }

      const parsedOpcode = {
        ...parsedOpcodeInitialState,
        registerX: 0x7,
        registerY: 0xb,
        oneDigitConstant: 0x3
      }

      const { programCounter, graphics, vRegisters } = drawGraphics(currentState, parsedOpcode)

      it('correctly updates pixel state using the xor operation', () => {
        const numberOfBytesToSlice = 8

        const firstRowStart = 0x13 + 0xa * 64
        const firstRow = graphics.slice(firstRowStart, firstRowStart + numberOfBytesToSlice)
        expect(firstRow).toEqual(Uint8Array.from([0, 0, 1, 0, 0, 1, 0, 1]))

        const secondRowStart = 0x13 + 0xb * 64
        const secondRow = graphics.slice(secondRowStart, secondRowStart + numberOfBytesToSlice)
        expect(secondRow).toEqual(Uint8Array.from([0, 0, 1, 1, 1, 1, 0, 0]))

        const thirdRowStart = 0x13 + 0xc * 64
        const thirdRow = graphics.slice(thirdRowStart, thirdRowStart + numberOfBytesToSlice)
        expect(thirdRow).toEqual(Uint8Array.from([1, 1, 1, 1, 1, 1, 0, 1]))
      })

      it('sets carry register to zero', () => {
        expect(vRegisters[0xf]).toBe(0x0)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x2f2)
      })
    })

    describe('when drawing on screen with some pixel state', () => {
      const currentState = {
        ...chip8InitialState,
        indexRegister: 0x2fd,
        memory: updateUint8Array(chip8InitialState.memory, {
          [0x2fd]: 0x42,
          [0x2fe]: 0xfb,
          [0x2ff]: 0x1a
        }),
        graphics: updateUint8Array(chip8InitialState.graphics, {
          [0x1c + 0x15 * 64]: 1,
          [0x1e + 0x15 * 64]: 1,
          [0x20 + 0x15 * 64]: 1,
          [0x1b + 0x16 * 64]: 1,
          [0x1d + 0x16 * 64]: 1,
          [0x1f + 0x16 * 64]: 1,
          [0x1a + 0x17 * 64]: 1,
          [0x1c + 0x17 * 64]: 1
        }),
        vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
          [0xc]: 0x1a,
          [0xa]: 0x15,
          [0xf]: 0x0
        }),
        programCounter: 0x3ca
      }

      const parsedOpcode = {
        ...parsedOpcodeInitialState,
        registerX: 0xc,
        registerY: 0xa,
        oneDigitConstant: 0x3
      }

      const { programCounter, graphics, vRegisters } = drawGraphics(currentState, parsedOpcode)

      it('correctly updates pixel state using the xor operation', () => {
        const numberOfBytesToSlice = 8

        const firstRowStart = 0x1a + 0x15 * 64
        const firstRow = graphics.slice(firstRowStart, firstRowStart + numberOfBytesToSlice)
        expect(firstRow).toEqual(Uint8Array.from([0, 1, 1, 0, 1, 0, 0, 0]))

        const secondRowStart = 0x1a + 0x16 * 64
        const secondRow = graphics.slice(secondRowStart, secondRowStart + numberOfBytesToSlice)
        expect(secondRow).toEqual(Uint8Array.from([1, 0, 1, 0, 1, 1, 1, 1]))

        const thirdRowStart = 0x1a + 0x17 * 64
        const thirdRow = graphics.slice(thirdRowStart, thirdRowStart + numberOfBytesToSlice)
        expect(thirdRow).toEqual(Uint8Array.from([1, 0, 1, 1, 1, 0, 1, 0]))
      })

      it('sets carry register to one', () => {
        expect(vRegisters[0xf]).toBe(0x1)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x3cc)
      })
    })

    describe('when drawing on screen past the screen boundary', () => {
      const currentState = {
        ...chip8InitialState,
        indexRegister: 0x31b,
        memory: updateUint8Array(chip8InitialState.memory, {
          [0x31b]: 0x25,
          [0x31c]: 0xa3,
          [0x31d]: 0x7c
        }),
        graphics: updateUint8Array(chip8InitialState.graphics, {
          [0x28 + 0x1e * 64]: 1,
          [0x2a + 0x1e * 64]: 1,
          [0x2c + 0x1e * 64]: 1,
          [0x29 + 0x1f * 64]: 1,
          [0x2b + 0x1f * 64]: 1,
          [0x28]: 1,
          [0x2a]: 1
        }),
        vRegisters: updateUint8Array(chip8InitialState.vRegisters, {
          [0xb]: 0x28,
          [0x5]: 0x1e,
          [0xf]: 0x0
        }),
        programCounter: 0x29b
      }

      const parsedOpcode = {
        ...parsedOpcodeInitialState,
        registerX: 0xb,
        registerY: 0x5,
        oneDigitConstant: 0x3
      }

      const { programCounter, graphics, vRegisters } = drawGraphics(currentState, parsedOpcode)

      it('correctly updates pixel state using the xor operation, and wraps to the other side of the screen', () => {
        const numberOfBytesToSlice = 8

        const firstRowStart = 0x28 + 0x1e * 64
        const firstRow = graphics.slice(firstRowStart, firstRowStart + numberOfBytesToSlice)
        expect(firstRow).toEqual(Uint8Array.from([1, 0, 0, 0, 1, 1, 0, 1]))

        const secondRowStart = 0x28 + 0x1f * 64
        const secondRow = graphics.slice(secondRowStart, secondRowStart + numberOfBytesToSlice)
        expect(secondRow).toEqual(Uint8Array.from([1, 1, 1, 1, 0, 0, 1, 1]))

        const thirdRowStart = 0x28
        const thirdRow = graphics.slice(thirdRowStart, thirdRowStart + numberOfBytesToSlice)
        expect(thirdRow).toEqual(Uint8Array.from([1, 1, 0, 1, 1, 1, 0, 0]))
      })

      it('sets carry register to one', () => {
        expect(vRegisters[0xf]).toBe(0x1)
      })

      it('increments program counter by two', () => {
        expect(programCounter).toBe(0x29d)
      })
    })
  })
})
