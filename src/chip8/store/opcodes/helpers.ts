import { Chip8, OpcodeFunc } from 'src/chip8/store'

interface RegisterMap {
  readonly [registerNumber: number]: number
}

export const loadRegisters = (registerMap: RegisterMap): OpcodeFunc => (
  chip8State: Chip8
): Chip8 => ({
  ...chip8State,
  vRegisters: Object.assign(Uint8Array.from({ length: 16 }), chip8State.vRegisters, registerMap)
})

export const continueToNextInstruction = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: chip8State.programCounter + 0x2
})

export const skipNextInstruction = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  programCounter: chip8State.programCounter + 0x4
})

export const skipNextInstructionIf = (expressionResult: boolean): OpcodeFunc =>
  expressionResult ? skipNextInstruction : continueToNextInstruction
