import { chip8InitialState } from 'src/chip8/types'
import { chip8Fontset } from 'src/constants'

import { chip8MemoryLoader } from './memoryLoader'

describe('chip8MemoryLoader', () => {
  describe('loadGame', () => {
    // prettier-ignore
    const mazeGame = Uint8Array.from([
      0xA2, 0x1E, 0xC2, 0x01, 0x32, 0x01, 0xA2, 0x1A, 
      0xD0, 0x14, 0x70, 0x04, 0x30, 0x40, 0x12, 0x00, 
      0x60, 0x00, 0x71, 0x04, 0x31, 0x20, 0x12, 0x00, 
      0x12, 0x18, 0x80, 0x40, 0x20, 0x10, 0x20, 0x40, 
      0x80, 0x10
    ])

    const { memory } = chip8MemoryLoader.loadGame(mazeGame)(chip8InitialState)

    it('correctly loads game into memory at address 0x200', () => {
      const numberOfBytesToSlice = 0x22
      const memorySlice = memory.slice(0x200, 0x200 + numberOfBytesToSlice)
      expect(memorySlice).toEqual(mazeGame)
    })
  })

  describe('loadFontset', () => {
    const { memory } = chip8MemoryLoader.loadFontset(chip8InitialState)

    it('correctly loads fontset into memory at address 0x0', () => {
      const numberOfBytesToSlice = 0x50
      const memorySlice = memory.slice(0x0, 0x0 + numberOfBytesToSlice)
      expect(memorySlice).toEqual(chip8Fontset)
    })
  })
})
