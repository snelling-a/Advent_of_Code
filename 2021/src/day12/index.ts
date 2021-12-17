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

const testCase1 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const testCase2 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

run({
	part1: {
		tests: [
			{ name: '', input: testCase1, expected: 19 },
			{ name: '', input: testCase2, expected: 226 },
		],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase1, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
