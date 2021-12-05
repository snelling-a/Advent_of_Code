import run from "aocrunner";

class Present {
  private readonly length: number;
  private readonly width: number;
  private readonly height: number;

  private readonly baseParams: number[];

  constructor(length: number, width: number, height: number) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.baseParams = [this.length, this.width, this.height];
  }

  public getSmallestSide(): {
    smallestSide: number;
    value: number;
  } {
    const baseParams = this.baseParams;
    const value = Math.min(...baseParams);
    const smallestSide = baseParams.indexOf(value);

    return { value, smallestSide };
  }

  public getBaseArea() {
    return (
      2 * this.length * this.width +
      2 * this.width * this.height +
      2 * this.height * this.length
    );
  }

  public getExtraArea() {
    switch (this.getSmallestSide().smallestSide) {
      case 0:
        return this.length * this.width;
      case 1:
        return this.width * this.height;
      case 2:
        return this.height * this.length;
      default:
        throw new Error("Invalid smallest side");
    }
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
