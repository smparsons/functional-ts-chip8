import { SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { chip8Selectors } from 'src/chip8/store'

import { chip8Actions } from './actions'

function* emulateCpuCycle(): SagaIterator {
  const nextOpcode = yield select(chip8Selectors.getNextOpcodeFromMemory)
  yield put(chip8Actions.loadOpcode(nextOpcode))
  yield call(() => executeNextOpcode(nextOpcode))
  yield put(chip8Actions.decrementTimers())
}

function* executeNextOpcode(opcode: number): SagaIterator {
  switch (opcode & 0xf000) {
    case 0x0000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8Actions.clearScreen())
        case 0x000e:
          yield put(chip8Actions.returnFromSubroutine())
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
    }
    case 0x1000:
      yield put(chip8Actions.jumpToAddress())
    case 0x2000:
      yield put(chip8Actions.callSubroutine())
    case 0x3000:
      yield put(chip8Actions.registerEqualsConstant())
    case 0x4000:
      yield put(chip8Actions.registerDoesNotEqualConstant())
    case 0x5000:
      yield put(chip8Actions.registersAreEqual())
    case 0x6000:
      yield put(chip8Actions.setRegisterToConstant())
    case 0x7000:
      yield put(chip8Actions.addConstantToRegister())
    case 0x8000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8Actions.assignToRegister())
        case 0x0001:
          yield put(chip8Actions.bitwiseOr())
        case 0x0002:
          yield put(chip8Actions.bitwiseAnd())
        case 0x0003:
          yield put(chip8Actions.bitwiseXor())
        case 0x0004:
          yield put(chip8Actions.addTwoRegisters())
        case 0x0005:
          yield put(chip8Actions.registerXMinusRegisterY())
        case 0x0006:
          yield put(chip8Actions.shiftRight())
        case 0x0007:
          yield put(chip8Actions.registerYMinusRegisterX())
        case 0x000e:
          yield put(chip8Actions.shiftLeft())
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
    }
    case 0x9000:
      yield put(chip8Actions.registersAreNotEqual())
    case 0xa000:
      yield put(chip8Actions.setIndexRegisterToAddress())
    case 0xb000:
      yield put(chip8Actions.jumpToAddressPlusRegisterZero())
    case 0xc000: {
      const randomNumber = yield call(Math.random)
      yield put(chip8Actions.randomBitwiseAnd(randomNumber))
    }
    case 0xd000: {
      yield put(chip8Actions.drawGraphics())
    }
    case 0xe000: {
      switch (opcode & 0x000f) {
        case 0x000e:
          yield put(chip8Actions.keyIsPressed())
        case 0x0001:
          yield put(chip8Actions.keyIsNotPressed())
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
    }
    case 0xf000: {
      switch (opcode & 0x00ff) {
        case 0x0007:
          yield put(chip8Actions.setRegisterToDelayTimer())
        case 0x000a:
          yield put(chip8Actions.awaitKeyPress())
        case 0x0015:
          yield put(chip8Actions.setDelayTimerToRegister())
        case 0x0018:
          yield put(chip8Actions.setSoundTimerToRegister())
        case 0x001e:
          yield put(chip8Actions.addRegisterXToIndexRegister())
        case 0x0029:
          yield put(chip8Actions.storeSpriteLocation())
        case 0x0033:
          yield put(chip8Actions.storeBCD())
        case 0x0055:
          yield put(chip8Actions.registerDump())
        case 0x0065:
          yield put(chip8Actions.registerLoad())
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
    }
    default:
      yield put(chip8Actions.unknownOpcode(opcode))
  }
}
