const fs = require('fs');
const path = require('path');

module.exports = (dir, { groupLines = false } = {}) => {
  if (!dir) {
    throw Error('Missing dir');
  }

  const filepath = path.join(dir, 'input.txt');
  let input = fs.readFileSync(filepath, 'utf8').split('\n');
  input.pop();

  if (groupLines) {
    // groups are separated by a line break which is an empty string in the already parsed input
    input = input.reduce(
      (lineGroups, line) => {
        if (line === '') {
          lineGroups.push([]);
        } else {
          lineGroups[lineGroups.length - 1].push(line);
        }

        return lineGroups;
      },
      [[]],
    );
  }

  return input;
};
