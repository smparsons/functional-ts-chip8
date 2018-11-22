import { combineReducers } from 'redux'
import { chip8Reducer } from 'src/chip8/store'
import { Chip8 } from 'src/chip8/types'
import { gameReducer } from 'src/game/store'
import { GameState } from 'src/game/types'

export interface RootState {
  readonly chip8: Chip8
  readonly game: GameState
}

export default combineReducers<RootState>({
  chip8: chip8Reducer,
  game: gameReducer
})
