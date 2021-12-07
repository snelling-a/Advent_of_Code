import run from 'aocrunner';

type Input = number[];

const parseInput = (rawInput: string): Input => rawInput.split(',').map(Number);

const median = (values: number[]) => {
	values.sort((a, b) => a - b);

	const half = Math.floor(values.length / 2);

	if (values.length % 2) {
		return values[half];
	} else {
		return (values[half - 1] + values[half]) / 2.0;
	}
};

const calculateFuelCosts = (input: Input) => {
	const moveTo = median(input);

	return input.reduce((acc, curr) => {
		return acc + Math.abs(curr - moveTo);
	}, 0);
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return calculateFuelCosts(input);
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
	onlyTests: false,
});
