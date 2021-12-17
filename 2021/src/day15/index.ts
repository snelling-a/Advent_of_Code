import run from 'aocrunner';

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split('\n');

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const chitonRiskLevel = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

run({
	part1: {
		tests: [{ name: 'lowest total risk of any path from the top left to the bottom right', input: chitonRiskLevel, expected: 40 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: chitonRiskLevel, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
