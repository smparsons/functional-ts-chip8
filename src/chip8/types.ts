import prand, { RandomGenerator } from 'pure-rand'
import { Func1 } from 'redux'

export enum KeyState {
  Released,
  Pressed
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
  readonly audioFlag: boolean
  readonly randomGenerator: RandomGenerator
  readonly error: string | null
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
  keyState: Array.from({ length: 16 }, () => 0x0),
  drawFlag: false,
  audioFlag: false,
  randomGenerator: prand.congruential(0),
  error: null
} as Chip8

export type OpcodeFunc = Func1<Chip8, Chip8>

export interface StartGameRequest {
  readonly gameName: string
}
