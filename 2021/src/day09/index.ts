import run from 'aocrunner';

type Input = number[][];
type Coord = { row: number; col: number; risk: number };

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => line.split('').map(Number));
const isLowestPoint = (input: Input, rowIndex: number, colIndex: number) => {
	const currentDepth = input[rowIndex][colIndex];
	const depthToTheRight = input[rowIndex]?.[colIndex + 1] ?? 9;
	const depthToTheLeft = input[rowIndex]?.[colIndex - 1] ?? 9;
	const depthBelow = input[rowIndex + 1]?.[colIndex] ?? 9;
	const depthAbove = input[rowIndex - 1]?.[colIndex] ?? 9;

	const test =
		currentDepth < depthToTheRight &&
		currentDepth < depthToTheLeft &&
		currentDepth < depthAbove &&
		currentDepth < depthBelow;

	return { currentDepth, test };
};

const getLowPoints = (input: Input): Coord[] => {
	const lowPoints: Coord[] = [];
	for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
		for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
			const { currentDepth, test } = isLowestPoint(input, rowIndex, colIndex);

			test && lowPoints.push({ row: rowIndex, col: colIndex, risk: currentDepth + 1 });
		}
	}

	return lowPoints;
};

const calculateRisk = (lowPoints: Coord[]) => lowPoints.reduce((acc, curr) => acc + curr.risk, 0);

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const lowPoints = getLowPoints(input);

	return calculateRisk(lowPoints);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

run({
	part1: {
		tests: [{ name: 'calculate risk of low points', input: testCase, expected: 15 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
