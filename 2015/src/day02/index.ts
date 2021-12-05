import run from "aocrunner";

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      { input: `2x3x4`, expected: 58 },
      { input: `1x1x10`, expected: 43 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
