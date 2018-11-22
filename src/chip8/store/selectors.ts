import { RootState } from 'src/rootReducer'

export const chip8Selectors = {
  getNextOpcodeFromMemory: (state: RootState): number => {
    const { memory, programCounter } = state.chip8
    return (memory[programCounter] << 8) | memory[programCounter + 1]
  },
  graphicsForRendering: (state: RootState): ReadonlyArray<number> => {
    const blackPixel: ReadonlyArray<number> = [0x0, 0x0, 0x0, 0xff]
    const whitePixel: ReadonlyArray<number> = [0xff, 0xff, 0xff, 0xff]
    return [].concat.apply(
      [],
      Array.from(state.chip8.graphics).map(pixel => (pixel ? whitePixel : blackPixel))
    )
  }
}
