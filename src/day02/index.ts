import run from "aocrunner";

const parseInput = (rawInput: string): [string, number][] =>
  rawInput
    .split("\n")
    .map((line) => [line.split(" ")[0], parseInt(line.split(" ")[1])]);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let horizontalPosition = 0;
  let depth = 0;

  for (const commandAndAmount of input) {
    switch (commandAndAmount[0]) {
      case "forward":
        horizontalPosition += commandAndAmount[1];
        break;
      case "up":
        depth -= commandAndAmount[1];
        break;
      case "down":
        depth += commandAndAmount[1];
      default:
        break;
    }
  }

  return horizontalPosition * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  for (const commandAndAmount of input) {
    switch (commandAndAmount[0]) {
      case "forward":
        horizontalPosition += commandAndAmount[1];
        depth += commandAndAmount[1] * aim;
        break;
      case "up":
        aim -= commandAndAmount[1];
        break;
      case "down":
        aim += commandAndAmount[1];
      default:
        break;
    }
  }
  return horizontalPosition * depth;
};

run({
  part1: {
    tests: [
      {
        input: `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
