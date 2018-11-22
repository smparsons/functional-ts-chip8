import { GameAction, gameActions } from 'src/game/store'
import { gameInitialState, GameState } from 'src/game/types'
import { getType } from 'typesafe-actions'

export const gameReducer = (state: GameState = gameInitialState, action: GameAction): GameState =>
  action.type === getType(gameActions.selectGame)
    ? { ...state, selectedGame: action.payload }
    : state
