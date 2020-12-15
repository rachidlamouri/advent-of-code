const loadInput = require('../../loadInput');

const passports = loadInput(__dirname)
  .reduce(
    (lineGroups, line) => {
      if (line === '') {
        lineGroups.push([]);
      } else {
        lineGroups[lineGroups.length - 1].push(line);
      }

      return lineGroups;
    },
    [[]],
  )
  .map((lineGroup) => {
    const passportLine = lineGroup.join(' ');
    const fieldStrings = passportLine.split(' ');
    const fields = fieldStrings.map((dataPair) => {
      const [key, value] = dataPair.split(':');
      return { key, value };
    });

    return fields.reduce(
      (passport, field) => {
        passport[field.key] = field.value; // eslint-disable-line no-param-reassign
        return passport;
      },
      {},
    );
  });

const buildValidateNumber = (min, max) => (stringValue) => {
  const value = parseInt(stringValue, 10);
  return value >= min && value <= max;
};

const validateCm = buildValidateNumber(150, 193);
const validateIn = buildValidateNumber(59, 76);

const fieldRules = {
  byr: buildValidateNumber(1920, 2002),
  iyr: buildValidateNumber(2010, 2020),
  eyr: buildValidateNumber(2020, 2030),
  hgt: (stringValue) => {
    const isCm = stringValue.endsWith('cm');
    if (!isCm && !stringValue.endsWith('in')) {
      return false;
    }

    const [valuePart] = stringValue.split(isCm ? 'cm' : 'in');

    return isCm
      ? validateCm(valuePart)
      : validateIn(valuePart);
  },
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value) => [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth',
  ].includes(value),
  pid: (value) => /^[0-9]{9}$/.test(value),
};

const passportsWithRequiredFields = passports
  .filter((passport) => (
    Object.keys(fieldRules).every((expectedKey) => passport[expectedKey] !== undefined)
  ));

console.log('Passports with required fields:', passportsWithRequiredFields.length);

const validPassports = passportsWithRequiredFields
  .filter((passport) => (
    Object.entries(fieldRules).every(([field, rule]) => rule(passport[field]))
  ));

console.log('Valid passports:', validPassports.length);
