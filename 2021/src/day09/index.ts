import run from 'aocrunner';

type Input = number[][];

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => line.split('').map(Number));

const getLowPoints = (input: Input) => {
	let sum = 0;
	for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
		for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
			const currentDepth = input[rowIndex][colIndex];
			const isFirstRow = rowIndex === 0;
			const isLastRow = rowIndex === input.length - 1;
			const isFirstCol = colIndex === 0;
			const isLastCol = colIndex === input[rowIndex].length - 1;

			const depthToTheRight = isLastCol ? 9 : input[rowIndex][colIndex + 1];
			const depthToTheLeft = isFirstCol ? 9 : input[rowIndex][colIndex - 1];
			const depthBelow = isLastRow ? 9 : input[rowIndex + 1][colIndex];
			const depthAbove = isFirstRow ? 9 : input[rowIndex - 1][colIndex];
			if (
				currentDepth < depthToTheRight &&
				currentDepth < depthToTheLeft &&
				currentDepth < depthAbove &&
				currentDepth < depthBelow
			) {

				sum += currentDepth + 1;
			}
		}
	}

	return sum;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return getLowPoints(input);
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
		tests: [{ name: 'find low points', input: testCase, expected: 15 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
