/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasRequiredSubstringsAfterSums = require('../index')

describe('#hasRequiredSubstringsAfterSums()', () => {
  describe('without required substrings', () => {
    it('should return true when requiredSubstrings is an empty object', () => {
      const str = '123a45'
      const requiredSubstrings = {}
      const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty, but not requiredSubstrings', () => {
      const str = ''
      const requiredSubstrings = { 1: 'a' }
      const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('basic summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123a45'
        const requiredSubstrings = { 1: 'a' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123a45'
        const requiredSubstrings = { 6: 'a' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123cza5'
        const requiredSubstrings = { 6: 'a' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'cza1235'
        const requiredSubstrings = { 0: 'a' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1a2b3c45'
        const requiredSubstrings = { 0: 'a', 1: 'b', 2: 'c' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1a2b3c45'
        const requiredSubstrings = { 1: 'a', 3: 'b', 10: 'a' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1a2b3c45'
        const requiredSubstrings = { 1: 'a', 3: 'b', 6: 'c' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '123abc45'
        const requiredSubstrings = { 1: 'abc' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '123abc45'
        const requiredSubstrings = { 6: 'abc' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123czabc5'
        const requiredSubstrings = { 6: 'abc' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'czabc1235'
        const requiredSubstrings = { 0: 'abc' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1abc2bcd3cde45'
        const requiredSubstrings = { 0: 'abc', 1: 'bcd', 2: 'cde' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1abc2bcd3cde45'
        const requiredSubstrings = { 1: 'abc', 3: 'bcd', 10: 'cde' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1abc2bcd3cde45'
        const requiredSubstrings = { 1: 'abc', 3: 'bcd', 6: 'cde' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowLastSubstringToBleed option', () => {
      it('should default to false', () => {
        const str = '123bma'
        const requiredSubstrings = { 6: 'machine' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not allow last substring to bleed when set to false', () => {
        const str = '123bma'
        const requiredSubstrings = { 6: 'machine' }
        const allowLastSubstringToBleed = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          allowLastSubstringToBleed: allowLastSubstringToBleed
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow last substring to bleed when set to true', () => {
        const str = '123bma'
        const requiredSubstrings = { 6: 'machine' }
        const allowLastSubstringToBleed = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          allowLastSubstringToBleed: allowLastSubstringToBleed
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('ignoreSumsOutsideString option', () => {
      it('should default to false', () => {
        const str = '123a'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not ignore sums outside string when set to false', () => {
        const str = '123a'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const ignoreSumsOutsideString = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          ignoreSumsOutsideString: ignoreSumsOutsideString
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should ignore sums outside string when set to true', () => {
        const str = '123a'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const ignoreSumsOutsideString = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          ignoreSumsOutsideString: ignoreSumsOutsideString
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('substringsToDigits summing', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const requiredSubstrings = { 1: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const requiredSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123!za5'
        const requiredSubstrings = { 10: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'za123!'
        const requiredSubstrings = { 0: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 0: 'a', 10: 'b', 1: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 5: 'a', 12: 'b', 1: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 5: 'a', 12: 'b', 21: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 1: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123!zabc5'
        const requiredSubstrings = { 10: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'zabc123!'
        const requiredSubstrings = { 0: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 0: 'abc', 10: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 5: 'abc', 12: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 5: 'abc', 12: 'bcd', 21: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substringsToDigits', () => {
      it('should return false when none of many substrings are found', () => {
        const str = '1!!!abc2!!!@bcd3###@cde'
        const requiredSubstrings = { 0: 'abc', 10: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!!!': 4, '@': 5, '###': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1!!!abc2!!!@bcd3###@cde'
        const requiredSubstrings = { 5: 'abc', 16: 'bcd', 1: 'cde' }
        const substringsToDigits = { '!!!': 4, '@': 5, '###': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!!!abc2!!!@bcd3###@cde'
        const requiredSubstrings = { 5: 'abc', 16: 'bcd', 30: 'cde' }
        const substringsToDigits = { '!!!': 4, '@': 5, '###': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowLastSubstringToBleed option', () => {
      it('should default to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not allow last substring to bleed when set to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowLastSubstringToBleed: allowSubstringBleeding
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow last substring to bleed when set to true', () => {
        const str = '123!zma'
        const requiredSubstrings = { 10: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowLastSubstringToBleed: allowSubstringBleeding
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('ignoreSumsOutsideString option', () => {
      it('should default to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const substringsToDigits = { '!': 30 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not ignore sums outside string when set to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const substringsToDigits = { '!': 30 }
        const ignoreSumsOutsideString = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          ignoreSumsOutsideString: ignoreSumsOutsideString
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should ignore sums outside string when set to true', () => {
        const str = '123!zma'
        const requiredSubstrings = { 100: 'tree', 150: 'fig' }
        const substringsToDigits = { '!': 30 }
        const ignoreSumsOutsideString = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          ignoreSumsOutsideString: ignoreSumsOutsideString
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })

  describe('sumPlainDigits', () => {
    describe('single character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!a'
        const requiredSubstrings = { 3: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!a'
        const requiredSubstrings = { 2: 'a' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123!za5'
        const requiredSubstrings = { 4: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'za123!'
        const requiredSubstrings = { 0: 'a' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 1: 'a', 2: 'b', 10: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 4: 'a', 9: 'b', 10: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!a2@b3#c'
        const requiredSubstrings = { 4: 'a', 9: 'b', 15: 'c' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('multi character substrings', () => {
      it('should return false when one of one substring is not found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 3: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when one of one substring is found', () => {
        const str = '1!abc'
        const requiredSubstrings = { 2: 'abc' }
        const substringsToDigits = { '!': 2 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return true when the substring is not immediately after the sum', () => {
        const str = '123!zabc5'
        const requiredSubstrings = { 4: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should work with a sum of 0', () => {
        const str = 'zabc123!'
        const requiredSubstrings = { 0: 'abc' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })

      it('should return false when none of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 1: 'abc', 2: 'bcd', 10: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return false when some of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 4: 'abc', 9: 'bcd', 10: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should return true when all of many substrings are found', () => {
        const str = '1!abc2@bcd3#cde'
        const requiredSubstrings = { 4: 'abc', 9: 'bcd', 15: 'cde' }
        const substringsToDigits = { '!': 4, '@': 5, '#': 6 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('allowLastSubstringToBleed option', () => {
      it('should default to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not allow last substring to bleed when set to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowLastSubstringToBleed: allowSubstringBleeding,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow last substring to bleed when set to true', () => {
        const str = '123!zma'
        const requiredSubstrings = { 4: 'man' }
        const substringsToDigits = { '!': 4 }
        const allowSubstringBleeding = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          allowLastSubstringToBleed: allowSubstringBleeding,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('ignoreSumsOutsideString option', () => {
      it('should default to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 32: 'tree', 45: 'fig' }
        const substringsToDigits = { '!': 30 }
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should not ignore sums outside string when set to false', () => {
        const str = '123!zma'
        const requiredSubstrings = { 32: 'tree', 45: 'fig' }
        const substringsToDigits = { '!': 30 }
        const ignoreSumsOutsideString = false
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          ignoreSumsOutsideString: ignoreSumsOutsideString,
          sumPlainDigits: false
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should ignore sums outside string when set to true', () => {
        const str = '123!zma'
        const requiredSubstrings = { 32: 'tree', 45: 'fig' }
        const substringsToDigits = { '!': 30 }
        const ignoreSumsOutsideString = true
        const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
          substringsToDigits: substringsToDigits,
          ignoreSumsOutsideString: ignoreSumsOutsideString,
          sumPlainDigits: false
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })
})
