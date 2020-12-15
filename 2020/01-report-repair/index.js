const loadInput = require('../../loadInput');

const input = loadInput(__dirname).map((value) => parseInt(value, 10))

input.forEach((value1, index1) => {
  input.forEach((value2, index2) => {
    if (index1 === index2) {
      return
    }

    if (value1 + value2 === 2020) {
      console.log('Product of 2 numbers that sum 2020:', value1, value2, value1 * value2)
    }

    input.forEach((value3, index3) => {
      if (
        index1 === index2
        || index1 === index3
        || index2 === index3
      ) {
        return
      }

      if (value1 + value2 + value3 === 2020) {
        console.log('Product of 3 numbers that sum 2020:', value1, value2, value3, value1 * value2 * value3)
      }
    })
  })
})
