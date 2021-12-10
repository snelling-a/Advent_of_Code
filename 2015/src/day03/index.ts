import run from "aocrunner";

type Input = Direction[];
type Direction = "^" | "v" | ">" | "<";

const parseInput = (rawInput: string): Input => rawInput.split("") as Input;

const followDirections = (input: Input, isRoboSanta = false) => {
  const santaPoints = { regular: { x: 0, y: 0 }, robo: { x: 0, y: 0 } };

  return input.reduce((housesMap, direction, inputIndex) => {
    const isRoboOrRegular = isRoboSanta && inputIndex % 2 === 1;

    let currentPointKey = isRoboOrRegular
      ? santaPoints.robo
      : santaPoints.regular;

    switch (direction) {
      case "^":
        currentPointKey.y--;
        break;
      case "v":
        currentPointKey.y++;
        break;
      case ">":
        currentPointKey.x++;
        break;
      case "<":
        currentPointKey.x--;
      default:
        break;
    }

    housesMap.has(JSON.stringify(currentPointKey))
      ? housesMap.get(JSON.stringify(currentPointKey))!.visits++
      : housesMap.set(JSON.stringify(currentPointKey), { visits: 1 });

    isRoboOrRegular
      ? (santaPoints.robo = currentPointKey)
      : (santaPoints.regular = currentPointKey);

    return housesMap;
  }, new Map([[JSON.stringify(santaPoints.regular), { visits: isRoboSanta ? 2 : 1 }]]))
    .size;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return followDirections(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return followDirections(input, true);
};

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
    tests: [
      { name: "north/south", input: `^v`, expected: 3 },
      { name: "back where they started", input: `^>v<`, expected: 3 },
      { name: "different directions", input: `^v^v^v^v^v`, expected: 11 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
