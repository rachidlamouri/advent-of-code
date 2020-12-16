const _ = require('lodash');
const loadInput = require('../../loadInput');

const buildPartition = (lowerLetter, initialMax) => (key) => key.split('').reduce(
  ({ min, max }, letter, index, letters) => {
    const isFront = letter === lowerLetter;
    const difference = max - min;

    const newMinRow = isFront ? min : min + Math.ceil(difference / 2);
    const newMaxRow = isFront ? min + Math.floor(difference / 2) : max;

    if (index < letters.length - 1) {
      return {
        min: newMinRow,
        max: newMaxRow,
      };
    }

    return isFront ? newMinRow : newMaxRow;
  },
  {
    min: 0,
    max: initialMax,
  },
);

const partitionRow = buildPartition('F', 127);
const partitionCol = buildPartition('L', 7);

const seats = loadInput(__dirname)
  .map((line) => {
    const rowKey = line.substring(0, 7);
    const colKey = line.substring(7, line.length);

    return {
      rowKey,
      colKey,
    };
  })
  .map((seat) => {
    const row = partitionRow(seat.rowKey);
    const col = partitionCol(seat.colKey);

    return {
      ...seat,
      row,
      col,
      id: row * 8 + col,
    };
  });

const largestSeatId = seats.reduce(
  (currentLargestId, seat) => (seat.id > currentLargestId ? seat.id : currentLargestId),
  -1,
);

console.log('Largest seat id:', largestSeatId);

const orderedSeats = _.sortBy(seats, 'id');
const [{ id: firstId }] = orderedSeats;
let missingId;
orderedSeats.forEach((seat, index) => {
  if (missingId || index === 0) {
    return;
  }

  const prevIndex = index - 1;
  const prevSeat = orderedSeats[prevIndex];
  const expectedPrevId = prevIndex + firstId;
  if (prevSeat.id !== expectedPrevId) {
    missingId = expectedPrevId;
    console.log('Missing id:', missingId, [prevSeat.id, seat.id]);
  }
});
