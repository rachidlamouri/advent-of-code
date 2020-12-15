const loadInput = require('../../loadInput');

const terrain = loadInput(__dirname).map((line) => line.split(''));
const colLength = terrain[0].length;
const endRow = terrain.length;

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const getTreeCount = (slope) => {
  const [right, down] = slope;
  console.log(`Slope: {down: ${down}, right: ${right}}`);
  console.log('[row, col] Trees Hit')

  const position = {
    col: 0,
    row: 0,
  };
  let treeCount = 0;

  const advance = () => {
    position.col += right;
    position.row += down;

    if (position.col >= colLength) {
      position.col = position.col % colLength;
    }
  }

  const checkTree = () => (
    treeCount += terrain[position.row][position.col] === '#'
      ? 1
      : 0
  )

  const printStatus = () => {
    console.log(`[${position.row}, ${position.col}]`, treeCount)
  }

  do {
    // printStatus();
    checkTree();
    advance();
  } while (position.row < endRow);

  printStatus();
  console.log();

  return treeCount;
}

const product = slopes
  .map(getTreeCount)
  .reduce((product, treeCount) => product * treeCount, 1)

console.log('Product of trees hit for all slopes:', product);
