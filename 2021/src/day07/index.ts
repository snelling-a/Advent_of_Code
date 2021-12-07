import run from 'aocrunner';

type Input = number[];

const parseInput = (rawInput: string): Input => rawInput.split(',').map(Number);

const getMeanValue = (input: Input) =>
	Math.round(input.reduce((acc, curr) => acc + curr, 0) / input.length);

const getMedianValue = (values: number[]) => {
	values.sort((a, b) => a - b);

	const half = Math.floor(values.length / 2);

	if (values.length % 2) {
		return values[half];
	} else {
		return (values[half - 1] + values[half]) / 2;
	}
};

const compoundFuel = (number: number): number => (number * number + number) / 2;

const calculateFuelCosts = (input: Input, moveTo: number, isCompounding = false) => {
	return input.reduce((acc, curr) => {
		const diff = Math.abs(curr - moveTo);

		return isCompounding ? acc + compoundFuel(diff) : acc + diff;
	}, 0);
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return calculateFuelCosts(input, getMedianValue(input));
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return calculateFuelCosts(input, getMeanValue(input), true);
};

const testCase = `
16,1,2,0,4,2,7,1,2,14
`;

run({
	part1: {
		tests: [{ name: 'Crabs!', input: testCase, expected: 37 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: 'Compounding Crabs!', input: testCase, expected: 168 }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
