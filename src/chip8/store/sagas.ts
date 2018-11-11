import { SagaIterator } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { chip8Selectors } from 'src/chip8/store'

import { chip8InternalCpuActions } from './actions'

function* emulateCpuCycle(): SagaIterator {
  const nextOpcode = yield select(chip8Selectors.getNextOpcodeFromMemory)
  yield put(chip8InternalCpuActions.loadOpcode(nextOpcode))
  yield call(() => executeNextOpcode(nextOpcode))
  yield put(chip8InternalCpuActions.decrementTimers())
}

function* executeNextOpcode(opcode: number): SagaIterator {
  switch (opcode & 0xf000) {
    case 0x0000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8InternalCpuActions.clearScreen())
        case 0x000e:
          yield put(chip8InternalCpuActions.returnFromSubroutine())
        default:
          yield put(chip8InternalCpuActions.unknownOpcode(opcode))
      }
    }
    case 0x1000:
      yield put(chip8InternalCpuActions.jumpToAddress())
    case 0x2000:
      yield put(chip8InternalCpuActions.callSubroutine())
    case 0x3000:
      yield put(chip8InternalCpuActions.registerEqualsConstant())
    case 0x4000:
      yield put(chip8InternalCpuActions.registerDoesNotEqualConstant())
    case 0x5000:
      yield put(chip8InternalCpuActions.registersAreEqual())
    case 0x6000:
      yield put(chip8InternalCpuActions.setRegisterToConstant())
    case 0x7000:
      yield put(chip8InternalCpuActions.addConstantToRegister())
    case 0x8000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8InternalCpuActions.assignToRegister())
        case 0x0001:
          yield put(chip8InternalCpuActions.bitwiseOr())
        case 0x0002:
          yield put(chip8InternalCpuActions.bitwiseAnd())
        case 0x0003:
          yield put(chip8InternalCpuActions.bitwiseXor())
        case 0x0004:
          yield put(chip8InternalCpuActions.addTwoRegisters())
        case 0x0005:
          yield put(chip8InternalCpuActions.registerXMinusRegisterY())
        case 0x0006:
          yield put(chip8InternalCpuActions.shiftRight())
        case 0x0007:
          yield put(chip8InternalCpuActions.registerYMinusRegisterX())
        case 0x000e:
          yield put(chip8InternalCpuActions.shiftLeft())
        default:
          yield put(chip8InternalCpuActions.unknownOpcode(opcode))
      }
    }
    case 0x9000:
      yield put(chip8InternalCpuActions.registersAreNotEqual())
    case 0xa000:
      yield put(chip8InternalCpuActions.setIndexRegisterToAddress())
    case 0xb000:
      yield put(chip8InternalCpuActions.jumpToAddressPlusRegisterZero())
    case 0xc000: {
      const randomNumber = yield call(Math.random)
      yield put(chip8InternalCpuActions.randomBitwiseAnd(randomNumber))
    }
    case 0xd000: {
      yield put(chip8InternalCpuActions.drawGraphics())
    }
    case 0xe000: {
      switch (opcode & 0x000f) {
        case 0x000e:
          yield put(chip8InternalCpuActions.keyIsPressed())
        case 0x0001:
          yield put(chip8InternalCpuActions.keyIsNotPressed())
        default:
          yield put(chip8InternalCpuActions.unknownOpcode(opcode))
      }
    }
    case 0xf000: {
      switch (opcode & 0x00ff) {
        case 0x0007:
          yield put(chip8InternalCpuActions.setRegisterToDelayTimer())
        case 0x000a:
          yield put(chip8InternalCpuActions.awaitKeyPress())
        case 0x0015:
          yield put(chip8InternalCpuActions.setDelayTimerToRegister())
        case 0x0018:
          yield put(chip8InternalCpuActions.setSoundTimerToRegister())
        case 0x001e:
          yield put(chip8InternalCpuActions.addRegisterXToIndexRegister())
        case 0x0029:
          yield put(chip8InternalCpuActions.storeSpriteLocation())
        case 0x0033:
          yield put(chip8InternalCpuActions.storeBCD())
        case 0x0055:
          yield put(chip8InternalCpuActions.registerDump())
        case 0x0065:
          yield put(chip8InternalCpuActions.registerLoad())
        default:
          yield put(chip8InternalCpuActions.unknownOpcode(opcode))
      }
    }
  }
}
