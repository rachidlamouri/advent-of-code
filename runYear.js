const glob = require('glob');
const { blue } = require('ansi-colors');

const [year] = process.argv.slice(2);

if (!year) {
  throw Error('Year is required');
}

const files = glob.sync(`${year}/**/index.js`);

files.forEach((filepath) => {
  console.log(blue(filepath));
  require(`./${filepath}`); // eslint-disable-line global-require, import/no-dynamic-require
  console.log();
});
