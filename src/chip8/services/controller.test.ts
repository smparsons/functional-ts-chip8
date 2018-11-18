import { chip8InitialState, KeyState } from 'src/chip8/types'

import { chip8Controller } from './controller'

describe('chip8Controller', () => {
  describe('pressKey', () => {
    const currentState = {
      ...chip8InitialState,
      keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
        3: KeyState.Pressed,
        7: KeyState.Pressed
      })
    }

    const { keyState } = chip8Controller.pressKey('2')(currentState)

    it('correctly stores key press', () => {
      expect(keyState).toEqual([
        KeyState.Released,
        KeyState.Released,
        KeyState.Pressed,
        KeyState.Pressed,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Pressed,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released
      ])
    })
  })

  describe('releaseKey', () => {
    const currentState = {
      ...chip8InitialState,
      keyState: Object.assign(Array.from({ length: 16 }), chip8InitialState.keyState, {
        5: KeyState.Pressed
      })
    }

    const { keyState } = chip8Controller.releaseKey('w')(currentState)

    it('correctly stores key release', () => {
      expect(keyState).toEqual([
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released,
        KeyState.Released
      ])
    })
  })
})
