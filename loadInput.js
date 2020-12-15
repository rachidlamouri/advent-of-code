const fs = require('fs');
const path = require('path');

module.exports = (dir) => {
  if (!dir) {
    throw Error('Missing dir');
  }

  const filepath = path.join(dir, 'input.txt');
  const input = fs.readFileSync(filepath, 'utf8').split('\n');
  input.pop();

  return input;
};
