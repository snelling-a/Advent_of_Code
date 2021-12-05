import run from "aocrunner";

class Present {
  private readonly length: number;
  private readonly width: number;
  private readonly height: number;
  private readonly baseAreas: number[];

  constructor(length: number, width: number, height: number) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.baseAreas = [
      this.length * this.width,
      this.width * this.height,
      this.height * this.length,
    ];
  }

  private getBaseArea() {
    return this.baseAreas.reduce((a, b) => a + 2 * b, 0);
  }

  private getExtraArea() {
    return Math.min(...this.baseAreas);
  }

  public getWrappingPaperArea() {
    return this.getBaseArea() + this.getExtraArea();
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

  return;
};

run({
  part1: {
    tests: [
      { input: `2x3x4`, expected: 58 },
      // { input: `1x1x10`, expected: 43 },
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
