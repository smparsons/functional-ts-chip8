import { chip8InitialState } from 'src/chip8/types'

import { cpu } from './cpu'

describe('cpu', () => {
  describe('decrementTimers', () => {
    describe('when the timers are non-zero', () => {
      const currentState = {
        ...chip8InitialState,
        soundTimer: 0x21,
        delayTimer: 0x25
      }

      const { soundTimer, delayTimer } = cpu.decrementTimers(currentState)

      it('decrements the sound timer', () => {
        expect(soundTimer).toBe(0x20)
      })

      it('decrements the delay timer', () => {
        expect(delayTimer).toBe(0x24)
      })
    })

    describe('when the timers are already at zero', () => {
      const currentState = {
        ...chip8InitialState,
        soundTimer: 0x0,
        delayTimer: 0x0
      }

      const { soundTimer, delayTimer } = cpu.decrementTimers(currentState)

      it('does not decrement the sound timer', () => {
        expect(soundTimer).toBe(0x0)
      })

      it('does not decrement the delay timer', () => {
        expect(delayTimer).toBe(0x0)
      })
    })

    describe('when decrementing sound timer from one to zero', () => {
      const currentState = {
        ...chip8InitialState,
        soundTimer: 0x1,
        audioFlag: false
      }

      const { audioFlag, soundTimer } = cpu.decrementTimers(currentState)

      it('decrements the sound timer', () => {
        expect(soundTimer).toBe(0x0)
      })

      it('sets audio flag to true', () => {
        expect(audioFlag).toBe(true)
      })
    })
  })
})
