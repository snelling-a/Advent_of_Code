import run from "aocrunner";

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split("");

const followDirections = (input: Input, isRoboSanta = false) => {
  const startingPointKey = { x: 0, y: 0 };
  let lastSantaPointKey = startingPointKey;

  const map = input.reduce((housesMap, direction, inputIndex) => {
    let currentPointKey = lastSantaPointKey;

    switch (direction) {
      case "^":
        currentPointKey = {
          x: lastSantaPointKey.x,
          y: lastSantaPointKey.y - 1,
        };
        housesMap.has(JSON.stringify(currentPointKey))
          ? housesMap.get(JSON.stringify(currentPointKey))!.visits++
          : housesMap.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastSantaPointKey = currentPointKey;
        return housesMap;
      case "v":
        currentPointKey = {
          x: lastSantaPointKey.x,
          y: lastSantaPointKey.y + 1,
        };
        housesMap.has(JSON.stringify(currentPointKey))
          ? housesMap.get(JSON.stringify(currentPointKey))!.visits++
          : housesMap.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastSantaPointKey = currentPointKey;
        return housesMap;
      case ">":
        currentPointKey = {
          x: lastSantaPointKey.x + 1,
          y: lastSantaPointKey.y,
        };
        housesMap.has(JSON.stringify(currentPointKey))
          ? housesMap.get(JSON.stringify(currentPointKey))!.visits++
          : housesMap.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastSantaPointKey = currentPointKey;
        return housesMap;
      case "<":
        currentPointKey = {
          x: lastSantaPointKey.x - 1,
          y: lastSantaPointKey.y,
        };
        housesMap.has(JSON.stringify(currentPointKey))
          ? housesMap.get(JSON.stringify(currentPointKey))!.visits++
          : housesMap.set(JSON.stringify(currentPointKey), { visits: 1 });
        lastSantaPointKey = currentPointKey;
        return housesMap;
      default:
        return housesMap;
    }
  }, new Map([[JSON.stringify(startingPointKey), { visits: isRoboSanta ? 2 : 1 }]]));
  return map.size;
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
