import { chip8Games } from 'src/constants'

export interface Game {
  readonly name: string
  readonly url: string
}

export interface GameState {
  readonly games: ReadonlyArray<Game>
  readonly selectedGame: Game | null
}

export const gameInitialState = {
  games: chip8Games,
  selectedGame: null
} as GameState
