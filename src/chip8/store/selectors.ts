import { Chip8, ParsedOpcode } from './types'

export const chip8Selectors = {
  parsedOpcode: ({ opcode, vRegisters }: Chip8): ParsedOpcode => {
    const registerXNumber = (opcode & 0x0f00) >>> 8
    const registerYNumber = (opcode & 0x00f0) >>> 4
    return {
      registerXNumber,
      registerYNumber,
      registerXValue: vRegisters[registerXNumber],
      registerYValue: vRegisters[registerYNumber],
      oneDigitConstant: opcode & 0x000f,
      twoDigitConstant: opcode & 0x00ff,
      threeDigitConstant: opcode & 0xfff
    }
  }
}
