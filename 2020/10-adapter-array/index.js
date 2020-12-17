const _ = require('lodash');
const loadInput = require('../../loadInput');

const sortedInput = _(loadInput(__dirname))
  .map((value) => parseInt(value, 10))
  .sortBy()
  .value();

const deviceJoltage = sortedInput[sortedInput.length - 1] + 3;
const joltages = [0, ...sortedInput, deviceJoltage];

const joltDifferences = joltages.map((value, index) => {
  if (index === 0) {
    return 0;
  }

  return value - joltages[index - 1];
});

const oneJoltDifferenceCount = joltDifferences.filter((difference) => difference === 1).length;
const threeJoltDifferenceCount = joltDifferences.filter((difference) => difference === 3).length;

console.log('Part 1 answer:', {
  oneJoltDifferenceCount,
  threeJoltDifferenceCount,
  product: oneJoltDifferenceCount * threeJoltDifferenceCount,
});

const joltagesMap = _(joltages)
  .map((joltage, index) => {
    const nextJoltages = joltages
      .slice(index + 1, index + 4)
      .map((nextJoltage) => ({
        nextJoltage,
        difference: nextJoltage - joltage,
      }))
      .filter(({ difference }) => difference <= 3)
      .map(({ nextJoltage }) => nextJoltage);

    return [joltage, nextJoltages];
  })
  .fromPairs()
  .value();

const countValidArrangements = (joltage = 0, cache = {}) => {
  const nextJoltages = joltagesMap[joltage];

  if (cache[joltage]) {
    return cache[joltage];
  }

  const count = nextJoltages.length === 0
    ? 1
    : nextJoltages.reduce(
      (sum, nextJoltage) => sum + countValidArrangements(nextJoltage, cache),
      0,
    );

  cache[joltage] = count; // eslint-disable-line no-param-reassign

  return count;
};

console.log('Valid arrangements:', countValidArrangements());
