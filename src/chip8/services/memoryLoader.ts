import { Chip8, OpcodeFunc } from 'src/chip8/types'
import { chip8Fontset } from 'src/constants'

const loadGame = (game: Uint8Array): OpcodeFunc => (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  memory: Object.assign(
    Uint8Array.from({ length: 4096 }),
    chip8State.memory,
    ...Array.from(game).map((value, index) => ({
      [index + 0x200]: value
    }))
  )
})

const loadFontset = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  memory: Object.assign(
    Uint8Array.from({ length: 4096 }),
    chip8State.memory,
    ...Array.from(chip8Fontset).map((value, index) => ({
      [index]: value
    }))
  )
})

export const chip8MemoryLoader = { loadGame, loadFontset }
