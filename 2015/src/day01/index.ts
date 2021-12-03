import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");
/*
(= up
) = down
*/
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let count = 0;
  input.forEach((char) => {
    if (char === "(") {
      count++;
    } else if (char === ")") {
      count--;
    }
  });
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
