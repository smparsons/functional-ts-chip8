import { chip8InitialState } from 'src/chip8/store'

import { assignToRegister } from './assignment'

describe('assignment', () => {
  describe('assignToRegister', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x8c50,
      programCounter: 0x27a,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, {
        [0xc]: 0x25,
        [0x5]: 0xa1
      })
    }

    const { programCounter, vRegisters } = assignToRegister(currentState)

    it('assigns VY to VX', () => {
      expect(vRegisters[0xc]).toBe(0xa1)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x27c)
    })
  })
})
