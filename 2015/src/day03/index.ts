import run from "aocrunner";

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split("");

const followDirections = (input: Input) => {
  const startingPointKey = { x: 0, y: 0 };
  let lastPointKey = startingPointKey;

  const map = input.reduce((acc, direction) => {
    let currentPointKey = lastPointKey;

    switch (direction) {
      case "^":
        currentPointKey = { x: lastPointKey.x, y: lastPointKey.y - 1 };
        acc.has(JSON.stringify(currentPointKey))
          ? acc.get(JSON.stringify(currentPointKey))!.visits++
          : acc.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastPointKey = currentPointKey;
        return acc;
      case "v":
        currentPointKey = { x: lastPointKey.x, y: lastPointKey.y + 1 };
        acc.has(JSON.stringify(currentPointKey))
          ? acc.get(JSON.stringify(currentPointKey))!.visits++
          : acc.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastPointKey = currentPointKey;
        return acc;
      case ">":
        currentPointKey = { x: lastPointKey.x + 1, y: lastPointKey.y };
        acc.has(JSON.stringify(currentPointKey))
          ? acc.get(JSON.stringify(currentPointKey))!.visits++
          : acc.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastPointKey = currentPointKey;
        return acc;
      case "<":
        currentPointKey = { x: lastPointKey.x - 1, y: lastPointKey.y };
        acc.has(JSON.stringify(currentPointKey))
          ? acc.get(JSON.stringify(currentPointKey))!.visits++
          : acc.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastPointKey = currentPointKey;
        return acc;
      default:
        return acc;
    }
  }, new Map([[JSON.stringify(startingPointKey), { visits: 1 }]]));
  return map.size;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return followDirections(input);
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
  onlyTests: false,
});
