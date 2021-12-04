import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const getFloor = (input: string[], getFirstUnderground: boolean = false) => {
  let currentFloor = 0;
  let firstUnderground = 0;

  input.forEach((direction, index) => {
    if (direction === "(") {
      currentFloor++;
    } else if (direction === ")") {
      currentFloor--;
    }

    if (currentFloor === -1 && firstUnderground === 0) {
      firstUnderground = index + 1;
    }
  });

  if (getFirstUnderground && firstUnderground) {
    return firstUnderground;
  }

  return currentFloor;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getFloor(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getFloor(input, true);
};

run({
  part1: {
    tests: [
      { input: `(())`, expected: 0 },
      { input: `()()`, expected: 0 },
      { input: `(((`, expected: 3 },
      { input: `(()(()(`, expected: 3 },
      { input: `))(((((`, expected: 3 },
      { input: `())`, expected: -1 },
      { input: `))(`, expected: -1 },
      { input: `)))`, expected: -3 },
      { input: `)())())`, expected: -3 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `)`, expected: 1 },
      { input: `()())`, expected: 5 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
