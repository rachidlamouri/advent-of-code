const loadInput = require('../../loadInput');

const instructions = loadInput(__dirname)
  .map((line) => {
    const [instruction, ...textValue] = line;

    const value = parseInt(textValue.join(''), 10);

    return {
      instruction,
      value,
    };
  });

let direction = 'E';
const position = { x: 0, y: 0 };

const move = (instruction, value) => {
  switch (instruction) {
    case 'N':
      position.y += value;
      break;
    case 'S':
      position.y -= value;
      break;
    case 'E':
      position.x += value;
      break;
    case 'W':
      position.x -= value;
      break;
    case 'R': {
      const directions = ['N', 'E', 'S', 'W'];
      const rotateUnits = value / 90;
      const currentIndex = directions.findIndex(((nextDir) => nextDir === direction));
      const nextIndex = (currentIndex + rotateUnits) % directions.length;
      direction = directions[nextIndex];
      break;
    }
    case 'L': {
      const directions = ['N', 'W', 'S', 'E'];
      const rotateUnits = value / 90;
      const currentIndex = directions.findIndex(((nextDir) => nextDir === direction));
      const nextIndex = (currentIndex + rotateUnits) % directions.length;
      direction = directions[nextIndex];
      break;
    }
    default:
      // 'F'
      move(direction, value);
  }
};

instructions.forEach(({ instruction, value }) => {
  move(instruction, value);
});

console.log('Taxicab distance:', Math.abs(position.x) + Math.abs(position.y));
