const loadInput = require('../../loadInput');

const input = loadInput(__dirname).map((value) => parseInt(value, 10));

const missingValue = input.reduce(
  (missingValue, value, index, values) => { // eslint-disable-line no-shadow
    if (index < 25) {
      return null;
    }

    const previousValues = values.slice(index - 25, index)
      .filter((prevValue) => prevValue !== value);

    const sumTable = {};
    previousValues.forEach((prevValue1, index1) => {
      previousValues.forEach((prevValue2, index2) => {
        if (index1 === index2) {
          return;
        }

        sumTable[prevValue1 + prevValue2] = true;
      });
    });

    return !sumTable[value] ? value : missingValue;
  },
  null,
);

console.log('Missing value:', missingValue);

for (let index1 = 0; index1 < input.length; index1 += 1) {
  for (let index2 = index1 + 1; index2 < input.length; index2 += 1) {
    const values = input.slice(index1, index2 + 1);
    const sum = values.reduce((rollingSum, value) => rollingSum + value, 0);

    if (sum === missingValue) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      console.log('Missing value sum range info:', { min, max, sum: min + max });
    }
  }
}
