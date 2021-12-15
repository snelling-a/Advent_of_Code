import run from 'aocrunner';

type Input = {
	polymer: string;
	pairInsertionRules: PairInsertionRule[];
};

type PairInsertionRule = {
	pair: string;
	insertionRule: string;
};

const parseInput = (rawInput: string): Input => {
	const [polymer, rawInsertions] = rawInput.split('\n\n');

	const pairInsertionRules = rawInsertions.split('\n').map((rule) => {
		const [pair, insertionRule] = rule.split(' -> ');

		return { pair, insertionRule };
	});

	return { polymer, pairInsertionRules };
};

const countChars = ({ polymer, pairInsertionRules }: Input, numberOfSteps: number) => {
	let polymerPairs = polymer.split('').reduce((map, element, index) => {
		const pair = `${element}${polymer[index + 1]}`;
		const pairExists = map.get(pair);
		pairExists ? map.set(pair, pairExists + 1) : map.set(pair, 1);

		return map;
	}, new Map<string, number>());

	for (let step = 0; step < numberOfSteps; step++) {
		polymerPairs = pairInsertionRules.reduce((map, { pair, insertionRule }) => {
			const pairExists = polymerPairs.get(pair);

			const firstPart = `${pair[0]}${insertionRule}`;
			const secondPart = `${insertionRule}${pair[1]}`;

			const getFirstPart = map.get(firstPart);
			const getSecondPart = map.get(secondPart);

			if (pairExists) {
				getFirstPart
					? map.set(firstPart, getFirstPart + pairExists)
					: map.set(firstPart, pairExists);
				getSecondPart
					? map.set(secondPart, getSecondPart + pairExists)
					: map.set(secondPart, pairExists);
			}

			return map;
		}, new Map<string, number>());
	}

	const count = [...polymerPairs.entries()].reduce((map, [pair, count]) => {
		const elementToCount = pair[0];
		const elementExists = map.get(elementToCount);

		elementExists
			? map.set(elementToCount, elementExists + count)
			: map.set(elementToCount, count);

		return map;
	}, new Map<string, number>([[polymer[polymer.length - 1], 1]]));

	return Math.max(...count.values()) - Math.min(...count.values());
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return countChars(input, 10);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return countChars(input, 40);
};

const testCase = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

run({
	part1: {
		tests: [
			{
				name: 'difference between most and least common element after 10 steps',
				input: testCase,
				expected: 1588,
			},
		],
		solution: part1,
	},
	part2: {
		tests: [
			{
				name: 'difference between most and least common element after 40 steps',
				input: testCase,
				expected: 2188189693529,
			},
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
