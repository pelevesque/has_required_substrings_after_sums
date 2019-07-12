[![Build Status](https://travis-ci.org/pelevesque/has_required_substrings_after_sums.svg?branch=master)](https://travis-ci.org/pelevesque/has_required_substrings_after_sums)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/has_required_substrings_after_sums/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/has_required_substrings_after_sums?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# has_required_substrings_after_sums

Checks if a string has required substrings after given sums.

## Related Packages

https://github.com/pelevesque/has_prohibited_substring_after_sums  
https://github.com/pelevesque/has_required_substrings  
https://github.com/pelevesque/has_prohibited_substring  
https://github.com/pelevesque/has_required_substrings_at_indexes   
https://github.com/pelevesque/has_prohibited_substring_at_indexes  

## Node Repository

https://www.npmjs.com/package/@pelevesque/has_required_substrings_after_sums

## Installation

`npm install @pelevesque/has_required_substrings_after_sums`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

### Parameters

```js
str                (required)
requiredSubstrings (required)
options            (optional) default = { substringsToDigits = null, sumPlainDigits = true, allowLastSubstringToBleed = false, ignoreSumsOutsideString = false }
```

### Requiring

```js
const hasRequiredSubstringsAfterSums = require('@pelevesque/has_required_substrings_after_sums')
```

### Basic Usage

@see https://github.com/pelevesque/sum-digits to understand how the sum is calculated.

`requiredSubstrings` is an object of sum -> substring pairs. `true` is returned
if all substrings are found after their associated sums but before the following sums.

```js
const str = '123a45'
const requiredSubstrings = { 1: 'a' }
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
// result === false
```

```js
const str = '123a45'
const requiredSubstrings = { 6: 'a' }
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
// result === true
```

```js
const str = '123bca45'
const requiredSubstrings = { 6: 'a' }
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
// result === true
```

```js
const str = '123man45adinosaur'
const requiredSubstrings = { 6: 'man', 15: 'dinosaur' }
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings)
// result === true
```

### Options

#### substringsToDigits

You can use the `substringsToDigits` option to give numeric values to substrings
so that they are counted during summing.

```js
const str = '123!$$$a'
const requiredSubstrings = { 15: 'a' }
const substringsToDigits = { '!': 4, '$$$': 5 }
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
  substringsToDigits: substringsToDigits
})
// result === true
```

#### sumPlainDigits

You can set the `sumPlainDigits` option to false if you only want to sum
`substringsToDigits`.

In the following example, `1`, `2`, and `3` are not summed.

```js
const str = '123!a'
const requiredSubstrings = { 4: 'a' }
const substringsToDigits = { '!': 4 }
const sumPlainDigits = false
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
  substringsToDigits: substringsToDigits,
  sumPlainDigits: sumPlainDigits
})
// result === true
```

#### allowLastSubstringToBleed

The `allowLastSubstringToBleed` option is `false` by default. It it used when you want
to allow the last substring to be incomplete if the string is too short.
In the following example, the last substring `canal` starts at the correct index,
but remains incomplete since the string ends. Normally this would return `false`.
With `allowLastSubstringToBleed` set to `true`, it returns `true`.

```js
const str = '123can'
const requiredSubstrings = { 6: 'canal' }
const allowLastSubstringToBleed = true
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
  allowLastSubstringToBleed: allowLastSubstringToBleed
})
// result === true
```

#### ignoreSumsOutsideString

The `ignoreSumsOutsideString` option is `false` by default. When set to `true`,
required substring sums that fall outside the string sums will be ignored.

```js
const str = '123a'
const requiredSubstrings = { 100: 'tree', 150: 'fig' }
const ignoreSumsOutsideString = true
const result = hasRequiredSubstringsAfterSums(str, requiredSubstrings, {
  ignoreSumsOutsideString: ignoreSumsOutsideString
})
// result === true
```
