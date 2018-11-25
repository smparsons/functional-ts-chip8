import { StartGameRequest } from 'src/chip8/types'
import { ActionType, createStandardAction } from 'typesafe-actions'

export const chip8Actions = {
  startGame: createStandardAction('[chip8] StartGame')<StartGameRequest>(),
  initializeChip8State: createStandardAction('[chip8] InitializeChip8State')<void>(),
  initializeRandomGenerator: createStandardAction('[chip8] InitializeRandomGenerator')<number>(),
  loadFontset: createStandardAction('[chip8] LoadFontset')<void>(),
  loadGame: createStandardAction('[chip8] LoadGame')<Uint8Array>(),
  stopDrawing: createStandardAction('[chip8] StopDrawing')<void>(),
  decrementTimers: createStandardAction('[chip8] DecrementTimers')<void>(),
  emulateCpuCycle: createStandardAction('[chip8] EmulateCpuCycle')<number>()
}

export type Chip8Action = ActionType<typeof chip8Actions>
