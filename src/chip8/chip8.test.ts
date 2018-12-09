import { chip8InitialState, KeyState } from 'src/chip8/types'
import { chip8Fontset } from 'src/constants'

import { chip8 } from './chip8'

describe('chip8', () => {
  describe('initializeChip8', () => {
    // prettier-ignore
    const mazeGame = Uint8Array.from([
      0xA2, 0x1E, 0xC2, 0x01, 0x32, 0x01, 0xA2, 0x1A, 
      0xD0, 0x14, 0x70, 0x04, 0x30, 0x40, 0x12, 0x00, 
      0x60, 0x00, 0x71, 0x04, 0x31, 0x20, 0x12, 0x00, 
      0x12, 0x18, 0x80, 0x40, 0x20, 0x10, 0x20, 0x40, 
      0x80, 0x10
    ])

    const { memory } = chip8.initializeChip8(mazeGame, 111)

    it('correctly loads game into memory at address 0x200', () => {
      const numberOfBytesToSlice = 0x22
      const memorySlice = memory.slice(0x200, 0x200 + numberOfBytesToSlice)
      expect(memorySlice).toEqual(mazeGame)
    })

    it('correctly loads fontset into memory at address 0x0', () => {
      const numberOfBytesToSlice = 0x50
      const memorySlice = memory.slice(0x0, 0x0 + numberOfBytesToSlice)
      expect(memorySlice).toEqual(chip8Fontset)
    })
  })

  describe('pressKey', () => {
    const currentState = {
      ...chip8InitialState,
      keyState: Object.assign([...chip8InitialState.keyState], {
        3: KeyState.Pressed,
        7: KeyState.Pressed
      })
    }

    const { keyState } = chip8.pressKey(currentState, '2')

    it('correctly stores key press', () => {
      expect(keyState).toEqual([
        KeyState.Released,
        KeyState.Released,
        KeyState.Pressed,
        KeyState.Pressed,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Pressed,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released
      ])
    })
  })

  describe('releaseKey', () => {
    const currentState = {
      ...chip8InitialState,
      keyState: Object.assign([...chip8InitialState.keyState], {
        5: KeyState.Pressed
      })
    }

    const { keyState } = chip8.releaseKey(currentState, 'w')

    it('correctly stores key release', () => {
      expect(keyState).toEqual([
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released
      ])
    })
  })
})
