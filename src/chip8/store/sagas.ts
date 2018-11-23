import axios from 'axios'
import { delay, SagaIterator } from 'redux-saga'
import { all, call, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import { chip8Actions, chip8Selectors } from 'src/chip8/store'
import { ActionType, getType } from 'typesafe-actions'

function* startGame(action: ActionType<typeof chip8Actions.startGame>): SagaIterator {
  yield put(chip8Actions.initializeChip8State())
  yield put(chip8Actions.loadFontset())
  yield call(loadGame, action.payload.gameName)

  const loopTask = yield fork(emulatorLoop)
  yield take(getType(chip8Actions.stopGame))
  yield cancel(loopTask)
}

function* loadGame(gameName: string): SagaIterator {
  const buffer = yield call(axios.get, `/roms/${gameName}`, { responseType: 'arraybuffer' })
  yield put(chip8Actions.loadGame(new Uint8Array(buffer.data)))
}

function* emulatorLoop(): SagaIterator {
  while (true) {
    yield call(emulateCpuCycle)
    // Check state and play audio if necessary
    yield call(delay, 1)
  }
}

function* emulateCpuCycle(): SagaIterator {
  const nextOpcode = yield select(chip8Selectors.getNextOpcodeFromMemory)
  yield put(chip8Actions.loadOpcode(nextOpcode))
  yield call(executeNextOpcode, nextOpcode)
  yield put(chip8Actions.decrementTimers())
}

function* executeNextOpcode(opcode: number): SagaIterator {
  switch (opcode & 0xf000) {
    case 0x0000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8Actions.clearScreen())
          yield put(chip8Actions.stopDrawing())
          break
        case 0x000e:
          yield put(chip8Actions.returnFromSubroutine())
          break
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
      break
    }
    case 0x1000:
      yield put(chip8Actions.jumpToAddress())
      break
    case 0x2000:
      yield put(chip8Actions.callSubroutine())
      break
    case 0x3000:
      yield put(chip8Actions.registerEqualsConstant())
      break
    case 0x4000:
      yield put(chip8Actions.registerDoesNotEqualConstant())
      break
    case 0x5000:
      yield put(chip8Actions.registersAreEqual())
      break
    case 0x6000:
      yield put(chip8Actions.setRegisterToConstant())
      break
    case 0x7000:
      yield put(chip8Actions.addConstantToRegister())
      break
    case 0x8000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          yield put(chip8Actions.assignToRegister())
          break
        case 0x0001:
          yield put(chip8Actions.bitwiseOr())
          break
        case 0x0002:
          yield put(chip8Actions.bitwiseAnd())
          break
        case 0x0003:
          yield put(chip8Actions.bitwiseXor())
          break
        case 0x0004:
          yield put(chip8Actions.addTwoRegisters())
          break
        case 0x0005:
          yield put(chip8Actions.registerXMinusRegisterY())
          break
        case 0x0006:
          yield put(chip8Actions.shiftRight())
          break
        case 0x0007:
          yield put(chip8Actions.registerYMinusRegisterX())
          break
        case 0x000e:
          yield put(chip8Actions.shiftLeft())
          break
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
      break
    }
    case 0x9000:
      yield put(chip8Actions.registersAreNotEqual())
      break
    case 0xa000:
      yield put(chip8Actions.setIndexRegisterToAddress())
      break
    case 0xb000:
      yield put(chip8Actions.jumpToAddressPlusRegisterZero())
      break
    case 0xc000: {
      const randomNumber = yield call(Math.random)
      yield put(chip8Actions.randomBitwiseAnd(randomNumber))
      break
    }
    case 0xd000: {
      yield put(chip8Actions.drawGraphics())
      yield put(chip8Actions.stopDrawing())
      break
    }
    case 0xe000: {
      switch (opcode & 0x000f) {
        case 0x000e:
          yield put(chip8Actions.keyIsPressed())
          break
        case 0x0001:
          yield put(chip8Actions.keyIsNotPressed())
          break
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
      break
    }
    case 0xf000: {
      switch (opcode & 0x00ff) {
        case 0x0007:
          yield put(chip8Actions.setRegisterToDelayTimer())
          break
        case 0x000a:
          yield put(chip8Actions.awaitKeyPress())
          break
        case 0x0015:
          yield put(chip8Actions.setDelayTimerToRegister())
          break
        case 0x0018:
          yield put(chip8Actions.setSoundTimerToRegister())
          break
        case 0x001e:
          yield put(chip8Actions.addRegisterXToIndexRegister())
          break
        case 0x0029:
          yield put(chip8Actions.storeSpriteLocation())
          break
        case 0x0033:
          yield put(chip8Actions.storeBCD())
          break
        case 0x0055:
          yield put(chip8Actions.registerDump())
          break
        case 0x0065:
          yield put(chip8Actions.registerLoad())
          break
        default:
          yield put(chip8Actions.unknownOpcode(opcode))
      }
      break
    }
    default:
      yield put(chip8Actions.unknownOpcode(opcode))
  }
}

export function* chip8Sagas(): SagaIterator {
  yield all([yield takeLatest(getType(chip8Actions.startGame), startGame)])
}
