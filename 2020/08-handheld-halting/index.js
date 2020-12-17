const loadInput = require('../../loadInput');

const instructions = loadInput(__dirname)
  .map((line, index) => {
    const [operation, signedValuePart] = line.split(' ');

    const sign = signedValuePart.substring(0, 1);
    const absoluteValue = parseInt(signedValuePart.substring(1, signedValuePart.length), 10);

    const argument = sign === '+' ? absoluteValue : -absoluteValue;

    return {
      index,
      operation,
      argument,
    };
  });

/* eslint-disable no-param-reassign */
const parse = (instructionList, index = 0, acc = 0, callsByIndex = {}) => {
  if (index === instructionList.length) {
    return ['parsed', acc];
  }

  if (callsByIndex[index]) {
    return ['looped', acc];
  }

  callsByIndex[index] = true;
  const instruction = instructionList[index];
  switch (instruction.operation) {
    case 'jmp':
      index += instruction.argument;
      break;
    case 'acc':
      acc += instruction.argument;
    default: index += 1; // eslint-disable-line no-fallthrough
  }

  return parse(instructionList, index, acc, callsByIndex);
};
/* eslint-enable no-param-reassign */
console.log('Accumulator before loop:', parse(instructions));

instructions
  .filter(({ operation }) => operation !== 'acc')
  .forEach((instruction) => {
    const instructionList = [
      ...instructions.slice(0, instruction.index),
      {
        ...instruction,
        operation: instruction.operation === 'jmp' ? 'nop' : 'jmp',
      },
      ...instructions.slice(instruction.index + 1, instructions.length),
    ];

    const [exitCode, acc] = parse(instructionList);
    if (exitCode === 'parsed') {
      console.log('Accumulator for fixed code:', acc);
    }
  });
