import { Chip8 } from 'src/chip8/types'

const opcodeRegisterXNumber = ({ opcode }: Chip8): number => (opcode & 0x0f00) >>> 8
const opcodeRegisterYNumber = ({ opcode }: Chip8): number => (opcode & 0x00f0) >>> 4

export const chip8Selectors = {
  getNextOpcodeFromMemory: (chip8State: Chip8): number => {
    const opcodeFirstHalf = chip8State.memory[chip8State.programCounter]
    const opcodeSecondHalf = chip8State.memory[chip8State.programCounter + 1]
    return (opcodeFirstHalf << 8) | opcodeSecondHalf
  },
  opcodeRegisterXNumber,
  opcodeRegisterYNumber,
  opcodeRegisterXValue: (chip8State: Chip8): number =>
    chip8State.vRegisters[opcodeRegisterXNumber(chip8State)],
  opcodeRegisterYValue: (chip8State: Chip8): number =>
    chip8State.vRegisters[opcodeRegisterYNumber(chip8State)],
  opcodeOneDigitConstant: ({ opcode }: Chip8): number => opcode & 0x000f,
  opcodeTwoDigitConstant: ({ opcode }: Chip8): number => opcode & 0x00ff,
  opcodeThreeDigitConstant: ({ opcode }: Chip8): number => opcode & 0x0fff
}
