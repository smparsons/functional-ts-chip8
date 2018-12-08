import prand, { RandomGenerator } from 'pure-rand'

export type Func0<R> = () => R
export type Func1<T1, R> = (a1: T1) => R

export enum KeyState {
  Released,
  Pressed
}

export interface Chip8 {
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
  readonly randomGenerator: RandomGenerator
  readonly audioFlag: boolean
  readonly error: string | null
}

export const chip8InitialState = {
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
  randomGenerator: prand.congruential(0),
  audioFlag: false,
  error: null
} as Chip8

export interface ParsedOpcode {
  readonly oneDigitConstant: number
  readonly twoDigitConstant: number
  readonly threeDigitConstant: number
  readonly registerX: number
  readonly registerY: number
}

export const parsedOpcodeInitialState = {
  oneDigitConstant: 0,
  twoDigitConstant: 0,
  threeDigitConstant: 0,
  registerX: 0,
  registerY: 0
} as ParsedOpcode

export type Chip8Func = Func1<Chip8, Chip8>

export interface StartGameRequest {
  readonly gameName: string
}

export interface InitializeChip8Request {
  readonly game: Uint8Array
  readonly initialSeed: number
}
