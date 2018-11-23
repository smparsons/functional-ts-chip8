import { Chip8 } from 'src/chip8/types'

export const chip8Selectors = {
  getNextOpcodeFromMemory: ({ memory, programCounter }: Chip8): number =>
    (memory[programCounter] << 8) | memory[programCounter + 1],
  graphicsForRendering: ({ graphics }: Chip8): ReadonlyArray<number> => {
    const blackPixel: ReadonlyArray<number> = [0x0, 0x0, 0x0, 0xff]
    const whitePixel: ReadonlyArray<number> = [0xff, 0xff, 0xff, 0xff]
    return [].concat.apply([], Array.from(graphics).map(pixel => (pixel ? whitePixel : blackPixel)))
  }
}
