import { Game } from 'src/game/types'
import { ActionType, createStandardAction } from 'typesafe-actions'

export const gameActions = {
  selectGame: createStandardAction('[game] SelectGame')<Game>()
}

export type GameAction = ActionType<typeof gameActions>
