import { chip8MemoryLoader, chip8Opcodes, chip8Timers } from 'src/chip8/services'
import { Chip8 } from 'src/chip8/types'
import { getType } from 'typesafe-actions'

import { Chip8Action, chip8Actions } from './actions'

export const chip8Reducer = (state: Chip8, action: Chip8Action): Chip8 => {
  switch (action.type) {
    case getType(chip8Actions.loadFontset):
      return chip8MemoryLoader.loadFontset(state)
    case getType(chip8Actions.decrementTimers):
      return chip8Timers.decrement(state)
    case getType(chip8Actions.addConstantToRegister):
      return chip8Opcodes.addConstantToRegister(state)
    case getType(chip8Actions.addRegisterXToIndexRegister):
      return chip8Opcodes.addRegisterXToIndexRegister(state)
    case getType(chip8Actions.addTwoRegisters):
      return chip8Opcodes.addTwoRegisters(state)
    case getType(chip8Actions.assignToRegister):
      return chip8Opcodes.assignToRegister(state)
    case getType(chip8Actions.awaitKeyPress):
      return chip8Opcodes.awaitKeyPress(state)
    case getType(chip8Actions.bitwiseAnd):
      return chip8Opcodes.bitwiseAnd(state)
    case getType(chip8Actions.bitwiseOr):
      return chip8Opcodes.bitwiseOr(state)
    case getType(chip8Actions.bitwiseXor):
      return chip8Opcodes.bitwiseXor(state)
    case getType(chip8Actions.callSubroutine):
      return chip8Opcodes.callSubroutine(state)
    case getType(chip8Actions.clearScreen):
      return chip8Opcodes.clearScreen(state)
    case getType(chip8Actions.drawGraphics):
      return chip8Opcodes.drawGraphics(state)
    case getType(chip8Actions.jumpToAddress):
      return chip8Opcodes.jumpToAddress(state)
    case getType(chip8Actions.jumpToAddressPlusRegisterZero):
      return chip8Opcodes.jumpToAddressPlusRegisterZero(state)
    case getType(chip8Actions.keyIsNotPressed):
      return chip8Opcodes.keyIsNotPressed(state)
    case getType(chip8Actions.keyIsPressed):
      return chip8Opcodes.keyIsPressed(state)
    case getType(chip8Actions.randomBitwiseAnd):
      return chip8Opcodes.randomBitwiseAnd(action.payload)(state)
    case getType(chip8Actions.registerDoesNotEqualConstant):
      return chip8Opcodes.registerDoesNotEqualConstant(state)
    case getType(chip8Actions.registerDump):
      return chip8Opcodes.registerDump(state)
    case getType(chip8Actions.registerEqualsConstant):
      return chip8Opcodes.registerEqualsConstant(state)
    case getType(chip8Actions.registerLoad):
      return chip8Opcodes.registerLoad(state)
    case getType(chip8Actions.registersAreEqual):
      return chip8Opcodes.registersAreEqual(state)
    case getType(chip8Actions.registersAreNotEqual):
      return chip8Opcodes.registersAreNotEqual(state)
    case getType(chip8Actions.registerXMinusRegisterY):
      return chip8Opcodes.registerXMinusRegisterY(state)
    case getType(chip8Actions.registerYMinusRegisterX):
      return chip8Opcodes.registerYMinusRegisterX(state)
    case getType(chip8Actions.returnFromSubroutine):
      return chip8Opcodes.returnFromSubroutine(state)
    case getType(chip8Actions.setDelayTimerToRegister):
      return chip8Opcodes.setDelayTimerToRegister(state)
    case getType(chip8Actions.setIndexRegisterToAddress):
      return chip8Opcodes.setIndexRegisterToAddress(state)
    case getType(chip8Actions.setRegisterToConstant):
      return chip8Opcodes.setRegisterToConstant(state)
    case getType(chip8Actions.setRegisterToDelayTimer):
      return chip8Opcodes.setRegisterToDelayTimer(state)
    case getType(chip8Actions.setSoundTimerToRegister):
      return chip8Opcodes.setSoundTimerToRegister(state)
    case getType(chip8Actions.shiftLeft):
      return chip8Opcodes.shiftLeft(state)
    case getType(chip8Actions.shiftRight):
      return chip8Opcodes.shiftRight(state)
    case getType(chip8Actions.storeBCD):
      return chip8Opcodes.storeBCD(state)
    case getType(chip8Actions.storeSpriteLocation):
      return chip8Opcodes.storeSpriteLocation(state)
    case getType(chip8Actions.loadOpcode):
      return { ...state, opcode: action.payload }
    case getType(chip8Actions.unknownOpcode):
      return { ...state, error: `Opcode is not recognized: ${action.payload.toString(16)}` }
  }
}
