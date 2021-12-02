import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((previousValue, currentValue, i) => {
    if (currentValue > input[i - 1]) {
      previousValue++;
    }

    return previousValue;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let windowA = 0;

  return input.reduce((previousValue, currentValue, i) => {
    if (i === 0 || !input[i + 1]) {
      return previousValue;
    }

    const windowB = currentValue + input[i + 1]  + input[i + 2] ;

    if (windowB > windowA) {
      previousValue++;
    }

    windowA = windowB;

    return previousValue;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        607
        618
        618
        617
        647
        716
        769
        792`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
