import { chip8InitialState } from 'src/chip8/store'

import {
    callSubroutine, jumpToAddress, jumpToAddressPlusRegisterZero, returnFromSubroutine
} from './flow'

describe('flow', () => {
  describe('returnToSubroutine', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x00ee,
      stackPointer: 2,
      stack: Uint16Array.from([0x150, 0x2f2]),
      programCounter: 0x316
    }

    const { stack, stackPointer, programCounter } = returnFromSubroutine(currentState)

    it('removes the last address from the stack', () => {
      expect(stack[stack.length - 1]).toBe(0x150)
    })

    it('decreases the length of the stack by one', () => {
      expect(stack.length).toBe(1)
    })

    it('decrements the stack pointer', () => {
      expect(stackPointer).toBe(1)
    })

    it('returns from the subroutine', () => {
      expect(programCounter).toBe(0x2f4)
    })
  })

  describe('jumpToAddress', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x11ef,
      programCounter: 0x3ff
    }

    const { programCounter } = jumpToAddress(currentState)

    it('jumps to address NNN', () => {
      expect(programCounter).toBe(0x1ef)
    })
  })

  describe('callSubroutine', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0x0225f,
      stackPointer: 1,
      stack: Uint16Array.from([0x210]),
      programCounter: 0x220
    }

    const { stack, stackPointer, programCounter } = callSubroutine(currentState)

    it('stores the current address in the stack', () => {
      expect(stack[stack.length - 1]).toBe(0x220)
    })

    it('increases the length of the stack by one', () => {
      expect(stack.length).toBe(2)
    })

    it('increments the stack pointer', () => {
      expect(stackPointer).toBe(2)
    })

    it('jumps to the given address', () => {
      expect(programCounter).toBe(0x25f)
    })
  })

  describe('jumpToAddressPlusRegisterZero', () => {
    const currentState = {
      ...chip8InitialState,
      opcode: 0xb1fa,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, {
        0: 0x51
      }),
      programCounter: 0x12a
    }

    const { programCounter } = jumpToAddressPlusRegisterZero(currentState)

    it('jumps to address NNN + V0', () => {
      expect(programCounter).toBe(0x24b)
    })
  })
})
