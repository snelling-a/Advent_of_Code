import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let increaseCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increaseCount++;
    }
  }

  return increaseCount;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let windowA = 0;
  let increaseCount = 0;

  for (let i = 1; i < input.length; i++) {
    const windowB = input[i] + (input[i + 1] || 0) + (input[i + 2] || 0);

    if (windowA < windowB) {
      increaseCount++;
    }

    windowA = windowB;
  }

  return increaseCount;
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
