const _ = require('lodash');
const loadInput = require('../../loadInput');

const input = loadInput(__dirname, { groupLines: true });

const groupsWithCounts = input
  .map((group) => ({
    groupSize: group.length,
    uniqueAnswerCounts: group.reduce(
      (uniqueAnswerCounts, singleAnswers) => {
        singleAnswers.split('').forEach((questionLetter) => {
          // eslint-disable-next-line no-param-reassign
          uniqueAnswerCounts[questionLetter] = (uniqueAnswerCounts[questionLetter] || 0) + 1;
        });

        return uniqueAnswerCounts;
      },
      {},
    ),
  }));

const sumOfUniqueCounts = groupsWithCounts
  .map(({ uniqueAnswerCounts }) => Object.keys(uniqueAnswerCounts).length)
  .reduce((sum, numAnswers) => sum + numAnswers, 0);

console.log('Sum of unique counts:', sumOfUniqueCounts);

const sumOfUnanimousCounts = groupsWithCounts
  .map(({ groupSize, uniqueAnswerCounts }) => (
    _(uniqueAnswerCounts)
      .toPairs(uniqueAnswerCounts)
      .filter(([, answerCount]) => answerCount === groupSize)
      .fromPairs()
      .value()
  ))
  .map((unanimousAnswerCounts) => Object.keys(unanimousAnswerCounts).length)
  .reduce((sum, numAnswers) => sum + numAnswers, 0);

console.log('Sum of unanimous counts:', sumOfUnanimousCounts);
