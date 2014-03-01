/*
Array#reduce

Task: Given an Array of strings, use Array#reduce to create an object that
contains the number of times each string occured in the array. Return the
object directly (no need to console.log).

#############
## Example ##
#############

```js

var inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']

console.log(countWords(inputWords))

// =>
// {
//   Apple: 2,
//   Banana: 1,
//   Durian: 3
// }

```

Arguments:

* inputWords: An array of random Strings.

Conditions:

* Do not use any for/while loops.
* You do not need to define any additional functions
 unless a stub is provided in the boilerplate.

*/

function countWords(inputWords) {
  return inputWords.reduce(function (prev, current, i) {
    prev[current] = prev[current] ? prev[current] + 1 : 1
    return prev
  }, {})
}

module.exports = countWords