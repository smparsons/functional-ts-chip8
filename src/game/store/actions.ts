import { ActionType, createStandardAction } from 'typesafe-actions'

export const gameActions = {
  selectGame: createStandardAction('[game] SelectGame')<string>()
}

export type GameAction = ActionType<typeof gameActions>
