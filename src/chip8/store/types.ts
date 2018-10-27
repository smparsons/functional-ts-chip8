export enum KeyState {
  Pressed,
  Released
}

export interface Chip8 {
  readonly opcode: number
  readonly memory: Uint8Array
  readonly vRegisters: Uint8Array
  readonly indexRegister: number
  readonly programCounter: number
  readonly graphics: Uint8Array
  readonly delayTimer: number
  readonly soundTimer: number
  readonly stack: Uint16Array
  readonly stackPointer: number
  readonly keyState: ReadonlyArray<KeyState>
  readonly drawFlag: boolean
}

export const chip8InitialState = {
  opcode: 0x0000,
  memory: Uint8Array.from({ length: 4096 }),
  vRegisters: Uint8Array.from({ length: 16 }),
  indexRegister: 0x0000,
  programCounter: 0x200,
  graphics: Uint8Array.from({ length: 2048 }),
  delayTimer: 0x00,
  soundTimer: 0x00,
  stack: Uint16Array.from({ length: 16 }),
  stackPointer: 0x0000,
  keyState: Array.from({ length: 16 }, () => KeyState.Released),
  drawFlag: false
} as Chip8

export interface ParsedOpcode {
  // registerXNumber is always the second digit in the opcode. ex: The X in opcode 8XYN
  readonly registerXNumber: number
  // registerYNumber is always the third digit in the opcode. ex: The Y in opcode 8XYN
  readonly registerYNumber: number
  // registerXValue is the value stored in register X
  readonly registerXValue: number
  // registerYValue is the value stored in register Y
  readonly registerYValue: number
  // oneDigitConstant is always the last digit in the opcode. ex: The N in opcode DXYN
  readonly oneDigitConstant: number
  // twoDigitConstant is always the last two digits in the opcode. ex: The NN in opcode CXNN
  readonly twoDigitConstant: number
  // threeDigitConstant is always the last three digits in the opcode. ex: The NNN in opcode ANNN
  readonly threeDigitConstant: number
}
