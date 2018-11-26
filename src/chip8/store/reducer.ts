import { chip8 } from 'src/chip8/services'
import { Chip8, chip8InitialState } from 'src/chip8/types'
import { getType } from 'typesafe-actions'

import { Chip8Action, chip8Actions } from './actions'

export const chip8Reducer = (state: Chip8 = chip8InitialState, action: Chip8Action): Chip8 => {
  switch (action.type) {
    case getType(chip8Actions.initializeChip8):
      return chip8.initializeChip8(action.payload.game, action.payload.initialSeed)
    case getType(chip8Actions.stopDrawing):
      return { ...state, drawFlag: false }
    case getType(chip8Actions.emulateCpuCycle):
      return chip8.emulateCpuCycle(action.payload)(state)
    default:
      return state
  }
}
