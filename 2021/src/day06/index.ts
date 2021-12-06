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

const testCase = '3,4,3,1,2';

run({
	part1: {
		tests: [{ input: testCase, expected: 5934 }],
		solution: part1,
	},
	// part2: {
	// 	tests: [{ input: testCase, expected: '' }],
	// 	solution: part2,
	// },
	trimTestInputs: true,
});
