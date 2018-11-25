import prand from 'pure-rand'
import { chip8MemoryLoader, chip8Timers, executeOpcode } from 'src/chip8/services'
import { Chip8, chip8InitialState } from 'src/chip8/types'
import { pipe } from 'src/functional'
import { getType } from 'typesafe-actions'

import { Chip8Action, chip8Actions } from './actions'

export const chip8Reducer = (state: Chip8 = chip8InitialState, action: Chip8Action): Chip8 => {
  switch (action.type) {
    case getType(chip8Actions.initializeChip8State):
      return chip8InitialState
    case getType(chip8Actions.loadFontset):
      return chip8MemoryLoader.loadFontset(state)
    case getType(chip8Actions.loadGame):
      return chip8MemoryLoader.loadGame(action.payload)(state)
    case getType(chip8Actions.initializeRandomGenerator):
      return { ...state, randomGenerator: prand.congruential(action.payload) }
    case getType(chip8Actions.stopDrawing):
      return { ...state, drawFlag: false }
    case getType(chip8Actions.emulateCpuCycle):
      return pipe(
        executeOpcode(action.payload),
        chip8Timers.decrement
      )(state)
    default:
      return state
  }
}
