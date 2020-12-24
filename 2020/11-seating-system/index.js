const loadInput = require('../../loadInput');

const seats = loadInput(__dirname)
  .map((line) => line.split(''));

const numRows = seats.length;
const numCols = seats[0].length;

const changeState = (oldSeats) => {
  const newSeats = oldSeats.map((oldRow, oldRowIndex) => oldRow.map((oldSeat, oldColIndex) => {
    const minRow = oldRow - 1 < 0 ? 0 : oldRow - 1;
    const maxRow = oldRow + 1 > numRows - 1 ? numRows - 1 :  oldRow + 1;

    const minCol = oldCol - 1 < 0 ? 0 : oldCol - 1;
    const maxCol = oldCol + 1 > numCols - 1 ? numCols - 1 : oldCol + 1;

    // TODO: skip non-seats

    let filledAdjacentSeatCount = 0;
    for (let rowIndex = minRow; rowIndex <= maxRow; rowIndex += 1) {
      for (let colIndex = minCol; minCol <= maxCol; rowIndex += 1) {
        if (rowIndex === oldRowIndex && colIndex === oldColIndex) {
          continue; // eslint-disable-line no-continue
        }

        const oldValue = oldSeats[rowIndex][colIndex];
        filledAdjacentSeatCount += oldValue === '#' ? 1 : 0;
      }
    }

    // TODO: use "filledAdjacentSeatCount" to change seat status

  }));

  process.exit();
};
