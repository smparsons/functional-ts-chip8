import { chip8Selectors } from './selectors'
import { chip8InitialState } from './types'

describe('helpers', () => {
  it('parses register x from opcode', () => {
    expect(
      chip8Selectors.opcodeRegisterXNumber({
        ...chip8InitialState,
        opcode: 0x8ce4
      })
    ).toBe(0xc)
  })

  it('parses register y from opcode', () => {
    expect(
      chip8Selectors.opcodeRegisterYNumber({
        ...chip8InitialState,
        opcode: 0x8ce4
      })
    ).toBe(0xe)
  })

  it('gets the value stored in register x', () => {
    const currentChip8State = {
      ...chip8InitialState,
      opcode: 0x8574,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, { 5: 0xa1 })
    }

    const registerXValue = chip8Selectors.opcodeRegisterXValue(
      currentChip8State
    )

    expect(registerXValue).toBe(0xa1)
  })

  it('gets the value stored in register y', () => {
    const currentChip8State = {
      ...chip8InitialState,
      opcode: 0x5300,
      vRegisters: Object.assign([], chip8InitialState.vRegisters, { 0: 0xcd })
    }

    const registerYValue = chip8Selectors.opcodeRegisterYValue(
      currentChip8State
    )

    expect(registerYValue).toBe(0xcd)
  })

  it('parses one digit constant from opcode', () => {
    expect(
      chip8Selectors.opcodeOneDigitConstant({
        ...chip8InitialState,
        opcode: 0xd7e2
      })
    ).toBe(0x2)
  })

  it('parses two digit constant from opcode', () => {
    expect(
      chip8Selectors.opcodeTwoDigitConstant({
        ...chip8InitialState,
        opcode: 0x6f2e
      })
    ).toBe(0x2e)
  })

  it('parses three digit constant from opcode', () => {
    expect(
      chip8Selectors.opcodeThreeDigitConstant({
        ...chip8InitialState,
        opcode: 0x2a1c
      })
    ).toBe(0xa1c)
  })
})
