import run from "aocrunner";

class Present {
  private readonly baseAreas: number[];
  private readonly baseDimensions: number[];

  constructor(length: number, width: number, height: number) {
    this.baseDimensions = [length, width, height];
    this.baseAreas = [length * width, width * height, height * length];
  }

  private getBaseArea() {
    return this.baseAreas.reduce((a, b) => a + 2 * b, 0);
  }

  private getExtraArea() {
    return Math.min(...this.baseAreas);
  }

  private getCubicVolume() {
    return this.baseDimensions.reduce((a, b) => a * b, 1);
  }

  private getShortestDistanceAround() {
    return this.baseDimensions
      .sort((a, b) => a - b)
      .slice(0, 2)
      .reduce((a, b) => a + 2 * b, 0);
  }

  public getWrappingPaperArea() {
    return this.getBaseArea() + this.getExtraArea();
  }

  public getRibbonLength() {
    return this.getShortestDistanceAround() + this.getCubicVolume();
  }
}

const parseInput = (rawInput: string): Present[] =>
  rawInput.split("\n").map((present: string) => {
    const [length, width, height] = present.split("x").map(Number);
    return new Present(length, width, height);
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach((present, index) => present.getWrappingPaperArea());

  return input.reduce(
    (totalWrappingPaperArea: number, currentPresent) =>
      (totalWrappingPaperArea += currentPresent.getWrappingPaperArea()),
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(
    (totalRibbonLength: number, currentPresent) =>
      (totalRibbonLength += currentPresent.getRibbonLength()),
    0,
  );
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
      { input: `2x3x4`, expected: 34 },
      { input: `1x1x10`, expected: 14 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
