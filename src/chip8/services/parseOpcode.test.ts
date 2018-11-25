import { parseOpcode } from './parseOpcode'

describe('helpers', () => {
  describe('parseOpcode', () => {
    const {
      oneDigitConstant,
      twoDigitConstant,
      threeDigitConstant,
      registerX,
      registerY
    } = parseOpcode(0x6c23)

    it('correctly parses one digit constant', () => {
      expect(oneDigitConstant).toBe(0x3)
    })

    it('correctly parses two digit constant', () => {
      expect(twoDigitConstant).toBe(0x23)
    })

    it('correctly parses three digit constant', () => {
      expect(threeDigitConstant).toBe(0xc23)
    })

    it('correctly parses register x', () => {
      expect(registerX).toBe(0xc)
    })

    it('correctly parses register y', () => {
      expect(registerY).toBe(0x2)
    })
  })
})
