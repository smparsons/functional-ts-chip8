import { InitializeChip8Request, StartGameRequest } from 'src/chip8/types'
import { ActionType, createStandardAction } from 'typesafe-actions'

export const chip8Actions = {
  startGame: createStandardAction('[chip8] StartGame')<StartGameRequest>(),
  initializeChip8: createStandardAction('[chip8] InitializeChip8')<InitializeChip8Request>(),
  stopDrawing: createStandardAction('[chip8] StopDrawing')<void>(),
  emulateCpuCycle: createStandardAction('[chip8] EmulateCpuCycle')<number>()
}

export type Chip8Action = ActionType<typeof chip8Actions>
