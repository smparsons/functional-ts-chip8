import axios from 'axios'
import { delay, SagaIterator } from 'redux-saga'
import { all, call, cancel, put, select, takeLatest } from 'redux-saga/effects'
import { chip8Actions, chip8Selectors } from 'src/chip8/store'
import { ActionType, getType } from 'typesafe-actions'

function* startGame(action: ActionType<typeof chip8Actions.startGame>): SagaIterator {
  yield put(chip8Actions.initializeChip8State())
  yield put(chip8Actions.loadFontset())
  yield call(loadGame, action.payload.gameName)

  const randomSeed = yield call(generateRandomSeed)
  yield put(chip8Actions.initializeRandomGenerator(randomSeed))

  yield call(emulatorLoop)
}

function* loadGame(gameName: string): SagaIterator {
  const buffer = yield call(axios.get, `/roms/${gameName}`, { responseType: 'arraybuffer' })
  yield put(chip8Actions.loadGame(new Uint8Array(buffer.data)))
}

// Generates a random seed for creating a random number generator.
// The seed is a random number between 0 and 1000.
const generateRandomSeed = () => Math.floor(Math.random() * 1000)

function* emulatorLoop(): SagaIterator {
  while (true) {
    const opcode = yield select(chip8Selectors.getNextOpcodeFromMemory)
    yield put(chip8Actions.emulateCpuCycle(opcode))

    if (isDrawingOpcode(opcode)) yield put(chip8Actions.stopDrawing())

    if (yield select(chip8Selectors.error)) yield cancel()

    // Check state and play audio if necessary
    yield call(delay, 1.5)
  }
}

const isDrawingOpcode = (opcode: number) => opcode === 0x00e0 || (opcode & 0xf000) === 0xd000

export function* chip8Sagas(): SagaIterator {
  yield all([yield takeLatest(getType(chip8Actions.startGame), startGame)])
}
