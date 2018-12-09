import { Chip8, ParsedOpcode } from 'src/chip8/types'

import { chip8Opcodes } from './opcodes'

const decrementTimers = (chip8State: Chip8): Chip8 => ({
  ...chip8State,
  delayTimer: chip8State.delayTimer > 0 ? chip8State.delayTimer - 1 : chip8State.delayTimer,
  soundTimer: chip8State.soundTimer > 0 ? chip8State.soundTimer - 1 : chip8State.soundTimer,
  audioFlag: chip8State.soundTimer === 1
})

export const executeOpcode = (chip8State: Chip8): Chip8 => {
  const opcode = getNextOpcodeFromMemory(chip8State)
  const parsedOpcode = parseOpcode(opcode)

  switch (opcode & 0xf000) {
    case 0x0000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          return chip8Opcodes.clearScreen(chip8State)
        case 0x000e:
          return chip8Opcodes.returnFromSubroutine(chip8State)
        default:
          return storeUnknownOpcodeError(chip8State, opcode)
      }
    }
    case 0x1000:
      return chip8Opcodes.jumpToAddress(chip8State, parsedOpcode)
    case 0x2000:
      return chip8Opcodes.callSubroutine(chip8State, parsedOpcode)
    case 0x3000:
      return chip8Opcodes.registerEqualsConstant(chip8State, parsedOpcode)
    case 0x4000:
      return chip8Opcodes.registerDoesNotEqualConstant(chip8State, parsedOpcode)
    case 0x5000:
      return chip8Opcodes.registersAreEqual(chip8State, parsedOpcode)
    case 0x6000:
      return chip8Opcodes.setRegisterToConstant(chip8State, parsedOpcode)
    case 0x7000:
      return chip8Opcodes.addConstantToRegister(chip8State, parsedOpcode)
    case 0x8000: {
      switch (opcode & 0x000f) {
        case 0x0000:
          return chip8Opcodes.assignToRegister(chip8State, parsedOpcode)
        case 0x0001:
          return chip8Opcodes.bitwiseOr(chip8State, parsedOpcode)
        case 0x0002:
          return chip8Opcodes.bitwiseAnd(chip8State, parsedOpcode)
        case 0x0003:
          return chip8Opcodes.bitwiseXor(chip8State, parsedOpcode)
        case 0x0004:
          return chip8Opcodes.addTwoRegisters(chip8State, parsedOpcode)
        case 0x0005:
          return chip8Opcodes.registerXMinusRegisterY(chip8State, parsedOpcode)
        case 0x0006:
          return chip8Opcodes.shiftRight(chip8State, parsedOpcode)
        case 0x0007:
          return chip8Opcodes.registerYMinusRegisterX(chip8State, parsedOpcode)
        case 0x000e:
          return chip8Opcodes.shiftLeft(chip8State, parsedOpcode)
        default:
          return storeUnknownOpcodeError(chip8State, opcode)
      }
    }
    case 0x9000:
      return chip8Opcodes.registersAreNotEqual(chip8State, parsedOpcode)
    case 0xa000:
      return chip8Opcodes.setIndexRegisterToAddress(chip8State, parsedOpcode)
    case 0xb000:
      return chip8Opcodes.jumpToAddressPlusRegisterZero(chip8State, parsedOpcode)
    case 0xc000:
      return chip8Opcodes.randomBitwiseAnd(chip8State, parsedOpcode)
    case 0xd000:
      return chip8Opcodes.drawGraphics(chip8State, parsedOpcode)
    case 0xe000: {
      switch (opcode & 0x000f) {
        case 0x000e:
          return chip8Opcodes.keyIsPressed(chip8State, parsedOpcode)
        case 0x0001:
          return chip8Opcodes.keyIsNotPressed(chip8State, parsedOpcode)
        default:
          return storeUnknownOpcodeError(chip8State, opcode)
      }
    }
    case 0xf000: {
      switch (opcode & 0x00ff) {
        case 0x0007:
          return chip8Opcodes.setRegisterToDelayTimer(chip8State, parsedOpcode)
        case 0x000a:
          return chip8Opcodes.awaitKeyPress(chip8State, parsedOpcode)
        case 0x0015:
          return chip8Opcodes.setDelayTimerToRegister(chip8State, parsedOpcode)
        case 0x0018:
          return chip8Opcodes.setSoundTimerToRegister(chip8State, parsedOpcode)
        case 0x001e:
          return chip8Opcodes.addRegisterXToIndexRegister(chip8State, parsedOpcode)
        case 0x0029:
          return chip8Opcodes.storeSpriteLocation(chip8State, parsedOpcode)
        case 0x0033:
          return chip8Opcodes.storeBCD(chip8State, parsedOpcode)
        case 0x0055:
          return chip8Opcodes.registerDump(chip8State, parsedOpcode)
        case 0x0065:
          return chip8Opcodes.registerLoad(chip8State, parsedOpcode)
        default:
          return storeUnknownOpcodeError(chip8State, opcode)
      }
    }
    default:
      return storeUnknownOpcodeError(chip8State, opcode)
  }
}

const getNextOpcodeFromMemory = ({ memory, programCounter }: Chip8): number =>
  (memory[programCounter] << 8) | memory[programCounter + 1]

const parseOpcode = (opcode: number): ParsedOpcode => ({
  oneDigitConstant: opcode & 0x000f,
  twoDigitConstant: opcode & 0x00ff,
  threeDigitConstant: opcode & 0x0fff,
  registerX: (opcode & 0x0f00) >>> 8,
  registerY: (opcode & 0x00f0) >>> 4
})

const storeUnknownOpcodeError = (chip8State: Chip8, opcode: number) => ({
  ...chip8State,
  error: `Opcode is not recognized: ${opcode.toString(16)}`
})

export const cpu = { decrementTimers, executeOpcode }
