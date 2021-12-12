import run from 'aocrunner';

type Input = number[][];

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => line.split('').map(Number));

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

run({
	part1: {
		tests: [{ name: 'flashing octopuses', input: testCase, expected: '' }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
