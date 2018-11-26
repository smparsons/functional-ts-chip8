import { chip8InitialState, parsedOpcodeInitialState } from 'src/chip8/types'

import { assignToRegister } from './assignment'

describe('assignment', () => {
  describe('assignToRegister', () => {
    const currentState = {
      ...chip8InitialState,
      programCounter: 0x27a,
      vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8InitialState.vRegisters, {
        [0xc]: 0x25,
        [0x5]: 0xa1
      })
    }

    const parsedOpcode = { ...parsedOpcodeInitialState, registerX: 0xc, registerY: 0x5 }

    const { programCounter, vRegisters } = assignToRegister(currentState, parsedOpcode)

    it('assigns VY to VX', () => {
      expect(vRegisters[0xc]).toBe(0xa1)
    })

    it('increments program counter by two', () => {
      expect(programCounter).toBe(0x27c)
    })
  })
})
