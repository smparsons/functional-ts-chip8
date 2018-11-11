import { chip8Opcodes } from 'src/chip8/opcodes'
import { Chip8 } from 'src/chip8/types'
import { getType } from 'typesafe-actions'

import { Chip8InternalCpuAction, chip8InternalCpuActions } from './actions'

export const chip8Reducer = (state: Chip8, action: Chip8InternalCpuAction): Chip8 => {
  switch (action.type) {
    case getType(chip8InternalCpuActions.addConstantToRegister):
      return chip8Opcodes.addConstantToRegister(state)
    case getType(chip8InternalCpuActions.addRegisterXToIndexRegister):
      return chip8Opcodes.addRegisterXToIndexRegister(state)
    case getType(chip8InternalCpuActions.addTwoRegisters):
      return chip8Opcodes.addTwoRegisters(state)
    case getType(chip8InternalCpuActions.assignToRegister):
      return chip8Opcodes.assignToRegister(state)
    case getType(chip8InternalCpuActions.awaitKeyPress):
      return chip8Opcodes.awaitKeyPress(state)
    case getType(chip8InternalCpuActions.bitwiseAnd):
      return chip8Opcodes.bitwiseAnd(state)
    case getType(chip8InternalCpuActions.bitwiseOr):
      return chip8Opcodes.bitwiseOr(state)
    case getType(chip8InternalCpuActions.bitwiseXor):
      return chip8Opcodes.bitwiseXor(state)
    case getType(chip8InternalCpuActions.callSubroutine):
      return chip8Opcodes.callSubroutine(state)
    case getType(chip8InternalCpuActions.clearScreen):
      return chip8Opcodes.clearScreen(state)
    case getType(chip8InternalCpuActions.drawGraphics):
      return chip8Opcodes.drawGraphics(state)
    case getType(chip8InternalCpuActions.jumpToAddress):
      return chip8Opcodes.jumpToAddress(state)
    case getType(chip8InternalCpuActions.jumpToAddressPlusRegisterZero):
      return chip8Opcodes.jumpToAddressPlusRegisterZero(state)
    case getType(chip8InternalCpuActions.keyIsNotPressed):
      return chip8Opcodes.keyIsNotPressed(state)
    case getType(chip8InternalCpuActions.keyIsPressed):
      return chip8Opcodes.keyIsPressed(state)
    case getType(chip8InternalCpuActions.randomBitwiseAnd):
      return chip8Opcodes.randomBitwiseAnd(action.payload)(state)
    case getType(chip8InternalCpuActions.registerDoesNotEqualConstant):
      return chip8Opcodes.registerDoesNotEqualConstant(state)
    case getType(chip8InternalCpuActions.registerDump):
      return chip8Opcodes.registerDump(state)
    case getType(chip8InternalCpuActions.registerEqualsConstant):
      return chip8Opcodes.registerEqualsConstant(state)
    case getType(chip8InternalCpuActions.registerLoad):
      return chip8Opcodes.registerLoad(state)
    case getType(chip8InternalCpuActions.registersAreEqual):
      return chip8Opcodes.registersAreEqual(state)
    case getType(chip8InternalCpuActions.registersAreNotEqual):
      return chip8Opcodes.registersAreNotEqual(state)
    case getType(chip8InternalCpuActions.registerXMinusRegisterY):
      return chip8Opcodes.registerXMinusRegisterY(state)
    case getType(chip8InternalCpuActions.registerYMinusRegisterX):
      return chip8Opcodes.registerYMinusRegisterX(state)
    case getType(chip8InternalCpuActions.returnFromSubroutine):
      return chip8Opcodes.returnFromSubroutine(state)
    case getType(chip8InternalCpuActions.setDelayTimerToRegister):
      return chip8Opcodes.setDelayTimerToRegister(state)
    case getType(chip8InternalCpuActions.setIndexRegisterToAddress):
      return chip8Opcodes.setIndexRegisterToAddress(state)
    case getType(chip8InternalCpuActions.setRegisterToConstant):
      return chip8Opcodes.setRegisterToConstant(state)
    case getType(chip8InternalCpuActions.setRegisterToDelayTimer):
      return chip8Opcodes.setRegisterToDelayTimer(state)
    case getType(chip8InternalCpuActions.setSoundTimerToRegister):
      return chip8Opcodes.setSoundTimerToRegister(state)
    case getType(chip8InternalCpuActions.shiftLeft):
      return chip8Opcodes.shiftLeft(state)
    case getType(chip8InternalCpuActions.shiftRight):
      return chip8Opcodes.shiftRight(state)
    case getType(chip8InternalCpuActions.storeBCD):
      return chip8Opcodes.storeBCD(state)
    case getType(chip8InternalCpuActions.storeSpriteLocation):
      return chip8Opcodes.storeSpriteLocation(state)
  }
}
