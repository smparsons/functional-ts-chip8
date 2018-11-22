interface ParsedOpcode {
  readonly oneDigitConstant: number
  readonly twoDigitConstant: number
  readonly threeDigitConstant: number
  readonly registerX: number
  readonly registerY: number
}

export const parseOpcode = (opcode: number): ParsedOpcode => ({
  oneDigitConstant: opcode & 0x000f,
  twoDigitConstant: opcode & 0x00ff,
  threeDigitConstant: opcode & 0x0fff,
  registerX: (opcode & 0x0f00) >>> 8,
  registerY: (opcode & 0x00f0) >>> 4
})
