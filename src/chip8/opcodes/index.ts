import * as assignmentOpcodes from './assignment'
import * as bitwiseOpcodes from './bitwise'
import * as conditionalOpcodes from './conditionals'
import * as constantOpcodes from './constant'
import * as flowOpcodes from './flow'
import * as graphicsOpcodes from './graphics'
import * as keyOpcodes from './keys'
import * as mathOpcodes from './math'
import * as memoryOpcodes from './memory'
import * as timerOpcodes from './timer'

export const chip8Opcodes = {
  ...assignmentOpcodes,
  ...bitwiseOpcodes,
  ...conditionalOpcodes,
  ...constantOpcodes,
  ...flowOpcodes,
  ...graphicsOpcodes,
  ...keyOpcodes,
  ...mathOpcodes,
  ...memoryOpcodes,
  ...timerOpcodes
}
