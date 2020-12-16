const loadInput = require('../../loadInput');

const bagRules = loadInput(__dirname)
  .reduce(
    (currentRules, line) => {
      line = line.replace(/.$/, ''); // eslint-disable-line no-param-reassign
      const [bagDescription, containsDescription] = line.split(' contain ');
      const [bagName] = bagDescription.split(' bag');

      // eslint-disable-next-line no-param-reassign
      currentRules[bagName] = containsDescription === 'no other bags'
        ? null
        : containsDescription.split(', ')
          .reduce(
            (rules, ruleDescription) => {
              const count = parseInt(ruleDescription.substring(0, 1), 10);
              const innerBagDescription = ruleDescription.substring(2, ruleDescription.length);

              const [innerBagName] = innerBagDescription.split(' bag');

              // eslint-disable-next-line no-param-reassign
              rules[innerBagName] = parseInt(count, 10);

              return rules;
            },
            {},
          );

      return currentRules;
    },
    {},
  );

const canHoldShinyGoldBag = (bagName) => {
  if (bagName === 'shiny gold') {
    return true;
  }

  if (bagRules[bagName] === null) {
    return false;
  }

  return Object.keys(bagRules[bagName]).some((innerBagName) => canHoldShinyGoldBag(innerBagName));
};

const bagsWithShinyGoldBag = Object.keys(bagRules)
  .filter((bagName) => bagName !== 'shiny gold' && canHoldShinyGoldBag(bagName))
  .length;

console.log('Number of bags that can hold a shiny gold bag:', bagsWithShinyGoldBag);

const sumBagsInBag = (bagRule) => {
  if (bagRule === null) {
    return 0;
  }

  return Object.entries(bagRule).reduce(
    (rollingSum, [bagName, bagCount]) => (
      rollingSum + bagCount + bagCount * sumBagsInBag(bagRules[bagName])
    ),
    0,
  );
};

const bagsInShinyGoldBag = sumBagsInBag(bagRules['shiny gold']);

console.log('Number of bags in a shiny gold bag:', bagsInShinyGoldBag);
