'use strict'

const sumDigits = require('@pelevesque/sum-digits')

const isObjectEmpty = (obj) => Object.entries(obj).length === 0

module.exports = (str, requiredSubstrings,
  {
    substringsToDigits = null,
    sumPlainDigits = true,
    allowLastSubstringToBleed = false,
    ignoreSumsOutsideString = false
  } = {}
) => {
  if (isObjectEmpty(requiredSubstrings)) return true
  const requiredSubstringsClone = Object.assign({}, requiredSubstrings)
  let sum = 0
  for (let i = 0, len = str.length; i < len; i++) {
    sum = sumDigits(str.substr(0, i + 1), {
      substringsToDigits: substringsToDigits,
      sumPlainDigits: sumPlainDigits
    })
    if (Object.prototype.hasOwnProperty.call(requiredSubstringsClone, sum)) {
      let substring = requiredSubstringsClone[sum]
      if (allowLastSubstringToBleed) {
        const substringMaxLength = str.length - i - 1
        if (substring.length > substringMaxLength) {
          substring = substring.substr(0, substringMaxLength)
        }
      }
      const target = str.substr(i + 1, substring.length)
      if (substring.localeCompare(target) === 0) {
        delete requiredSubstringsClone[sum]
      }
    }
  }
  if (ignoreSumsOutsideString) {
    for (const key in requiredSubstringsClone) {
      if (key > sum) {
        delete requiredSubstringsClone[key]
      }
    }
  }
  return isObjectEmpty(requiredSubstringsClone)
}
