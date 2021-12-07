import run from 'aocrunner';

type Input = number[];

const parseInput = (rawInput: string): Input => rawInput.split(',').map(Number);

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
16,1,2,0,4,2,7,1,2,14
`;

run({
	part1: {
		tests: [{ name: 'Whales', input: testCase, expected: 37 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: 'Whales', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
