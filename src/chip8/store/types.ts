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
