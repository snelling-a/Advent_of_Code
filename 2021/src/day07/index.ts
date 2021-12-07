import run from 'aocrunner';

type Input = number[];

const parseInput = (rawInput: string): Input =>
	rawInput
		.split(',')
		.map(Number)
		.sort((a, b) => a - b);

const getAllPossiblePositions = (input: Input) =>
	new Array(input[input.length - 1] - input[0])
		.fill(0)
		.reduce((positions, _, index) => [...positions, index + 1], [0]);

const compoundFuel = (number: number) => Math.floor((number * (number + 1)) / 2);

const calculateFuelCosts = (input: Input, isCompounding = false) => {
	const allPossiblePositions = getAllPossiblePositions(input);

	let optimalFuel = -1;

	for (const position of allPossiblePositions) {
		const fuelNeededForThisPosition = input.reduce((acc, curr) => {
			const diff = Math.abs(position - curr);

			return acc + (isCompounding ? compoundFuel(diff) : diff);
		}, 0);

		optimalFuel === -1
			? (optimalFuel = fuelNeededForThisPosition)
			: (optimalFuel = Math.min(optimalFuel, fuelNeededForThisPosition));
	}

	return optimalFuel;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return calculateFuelCosts(input);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return calculateFuelCosts(input, true);
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
	onlyTests: true,
});
