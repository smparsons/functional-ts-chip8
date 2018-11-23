import { Chip8 } from 'src/chip8/types'

export const chip8Selectors = {
  getNextOpcodeFromMemory: ({ memory, programCounter }: Chip8): number =>
    (memory[programCounter] << 8) | memory[programCounter + 1],
  graphics: ({ graphics }: Chip8): Uint8Array => graphics
}
