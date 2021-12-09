import run from "aocrunner";

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split("");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const testCase = "";

run({
  part1: {
    tests: [
      { name: "start and one east", input: `>`, expected: 2 },
      {
        name: "4 houses in a square, twice to start end",
        input: `^>v<`,
        expected: 4,
      },
      { name: "very lucky children", input: `^v^v^v^v^v`, expected: 2 },
    ],
    solution: part1,
  },
  part2: {
    tests: [{ name: "", input: testCase, expected: "" }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
