const loadInput = require('../../loadInput');

const layout = loadInput(__dirname)
  .map((line) => line.split(''));

const isEqual = (layoutA, layout2) => (
  layoutA.every((rowA, rowIndex) => (
    rowA.every((valueA, colIndex) => valueA === layout2[rowIndex][colIndex])
  ))
);

// const printLayout = (layoutToPrint) => {
//   layoutToPrint.forEach((row) => {
//     let values = '';
//     row.forEach((value) => {
//       values += value;
//     });

//     console.log(values);
//   });
// };

const changeState = (oldLayout, tolerance, countFilledSeats) => {
  const newLayout = oldLayout.map((oldRow, oldRowIndex) => oldRow.map((oldValue, oldColIndex) => {
    const filledSeatCount = countFilledSeats(oldLayout, oldRowIndex, oldColIndex);

    if (oldValue === 'L' && filledSeatCount === 0) {
      return '#';
    }

    if (oldValue === '#' && filledSeatCount >= tolerance) {
      return 'L';
    }

    return oldValue;
  }));

  if (!isEqual(oldLayout, newLayout)) {
    return changeState(newLayout, tolerance, countFilledSeats);
  }

  return newLayout;
};

const finalLayout1 = changeState(
  layout,
  4,
  (oldLayout, oldRowIndex, oldColIndex) => {
    let filledAdjacentSeatCount = 0;
    for (let rowIndex = oldRowIndex - 1; rowIndex <= oldRowIndex + 1; rowIndex += 1) {
      for (let colIndex = oldColIndex - 1; colIndex <= oldColIndex + 1; colIndex += 1) {
        const lastValue = (oldLayout[rowIndex] || [])[colIndex] || '?';
        filledAdjacentSeatCount += (lastValue === '#' && !(rowIndex === oldRowIndex && colIndex === oldColIndex))
          ? 1 : 0;
      }
    }

    return filledAdjacentSeatCount;
  },
);

const finalOccuppiedCount1 = finalLayout1
  .flat()
  .filter((value) => value === '#')
  .length;

console.log('Final occupied count (part 1):', finalOccuppiedCount1);

const getSeatCountInDirection = (oldLayout, rowIndex, colIndex, rowInc, colInc) => {
  const oldValue = (oldLayout[rowIndex] || [])[colIndex] || '?';

  if (oldValue === '.') {
    return getSeatCountInDirection(oldLayout, rowIndex + rowInc, colIndex + colInc, rowInc, colInc);
  }

  if (oldValue === '#') {
    return 1;
  }

  return 0;
};

const finalLayout2 = changeState(
  layout,
  5,
  (oldLayout, oldRowIndex, oldColIndex) => {
    let filledSeatCount = 0;

    for (let rowInc = -1; rowInc <= 1; rowInc += 1) {
      for (let colInc = -1; colInc <= 1; colInc += 1) {
        filledSeatCount += rowInc === 0 && colInc === 0
          ? 0
          : getSeatCountInDirection(
            oldLayout,
            oldRowIndex + rowInc,
            oldColIndex + colInc,
            rowInc,
            colInc,
          );
      }
    }

    return filledSeatCount;
  },
);

const finalOccuppiedCount2 = finalLayout2
  .flat()
  .filter((value) => value === '#')
  .length;

console.log('Final occupied count (part 2):', finalOccuppiedCount2);
