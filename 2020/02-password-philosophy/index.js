const loadInput = require('../../loadInput');

const validInputsForRule1 = loadInput(__dirname)
  .map((line) => {
    const [policyText, password] = line.split(': ');
    const [range, letter] = policyText.split(' ');
    const [min, max] = range.split('-').map((value) => parseInt(value, 10));

    return {
      line,
      letter,
      min,
      max,
      password,
    };
  })
  .filter(({
    letter,
    min,
    max,
    password,
  }) => {
    const letterCount = password
      .split('')
      .filter((nextLetter) => nextLetter === letter)
      .join('')
      .length;

    return letterCount >= min && letterCount <= max;
  });

console.log('Number of rule 1 valid inputs:', validInputsForRule1.length);

const validInputsForRule2 = loadInput(__dirname)
  .map((line) => {
    const [policyText, password] = line.split(': ');
    const [positions, letter] = policyText.split(' ');
    const [position1, position2] = positions.split('-').map((value) => parseInt(value, 10));

    return {
      line,
      letter,
      index1: position1 - 1,
      index2: position2 - 1,
      password,
    };
  })
  .filter(({
    letter,
    index1,
    index2,
    password,
  }) => {
    const passwordLetters = password.split('');

    const isAtPosition1 = passwordLetters[index1] === letter;
    const isAtPosition2 = passwordLetters[index2] === letter;

    return (
      (isAtPosition1 && !isAtPosition2)
      || (!isAtPosition1 && isAtPosition2)
    );
  });

console.log('Number of rule 2 valid inputs:', validInputsForRule2.length);
