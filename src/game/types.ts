import { chip8Games } from 'src/constants'

export interface GameState {
  readonly games: ReadonlyArray<string>
  readonly selectedGame: string | null
}

export const gameInitialState = {
  games: chip8Games,
  selectedGame: null
} as GameState
