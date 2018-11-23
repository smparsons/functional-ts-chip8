import { chip8InitialState } from 'src/chip8/types'

import { chip8Selectors } from './selectors'

describe('chip8Selectors', () => {
  describe('getNextOpcodeFromMemory', () => {
    const currentState = {
      ...chip8InitialState,
      memory: Object.assign(Uint8Array.from({ length: 4096 }), chip8InitialState.memory, {
        [0x240]: 0x8a,
        [0x241]: 0x74,
        [0x242]: 0x00,
        [0x243]: 0xee,
        [0x244]: 0x05,
        [0x245]: 0x72,
        [0x246]: 0xfa,
        [0x247]: 0x29
      })
    }

    it('correctly extracts opcodes', () => {
      const firstOpcode = chip8Selectors.getNextOpcodeFromMemory({
        ...currentState,
        programCounter: 0x240
      })
      expect(firstOpcode).toBe(0x8a74)

      const secondOpcode = chip8Selectors.getNextOpcodeFromMemory({
        ...currentState,
        programCounter: 0x242
      })
      expect(secondOpcode).toBe(0x00ee)

      const thirdOpcode = chip8Selectors.getNextOpcodeFromMemory({
        ...currentState,
        programCounter: 0x244
      })
      expect(thirdOpcode).toBe(0x0572)

      const fourthOpcode = chip8Selectors.getNextOpcodeFromMemory({
        ...currentState,
        programCounter: 0x246
      })
      expect(fourthOpcode).toBe(0xfa29)
    })
  })

  describe('graphicsForRendering', () => {
    it('should convert graphics into a array where each pixel is represented in RGBA format', () => {
      const currentState = {
        ...chip8InitialState,
        graphics: Object.assign(Uint8Array.from({ length: 2048 }), chip8InitialState.graphics, {
          [0x1]: 1,
          [0x3]: 1,
          [0x7fc]: 1,
          [0x7fe]: 1
        })
      }

      const graphics = chip8Selectors.graphicsForRendering(currentState)
      const numberOfBytesToSlice = 16

      const firstRow = graphics.slice(0, numberOfBytesToSlice)
      // prettier-ignore
      expect(firstRow)
        .toEqual([0x0, 0x0, 0x0, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0xff, 0xff, 0xff, 0xff, 0xff])

      const lastRow = graphics.slice(0x1ff0, 0x1ff0 + numberOfBytesToSlice)
      // prettier-ignore
      expect(lastRow)
        .toEqual([0xff, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0, 0x0, 0x0, 0xff])
    })
  })
})
