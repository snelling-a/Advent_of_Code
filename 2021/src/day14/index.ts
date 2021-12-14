import run from 'aocrunner';

type Input = [string, Map<string, string>];

const parseInput = (rawInput: string): Input => {
	const [template, rawInsertions] = rawInput.split('\n\n');

	const insertions = rawInsertions.split('\n').reduce((acc, curr) => {
		const [rule, insertion] = curr.split(' -> ');

		return acc.set(rule, insertion);
	}, new Map());

	return [template, insertions];
};

const createPolymer = ([template, insertions]: Input, numberOfSteps: number) => {
	let polymer = template;

	for (let step = 1; step <= numberOfSteps; step++) {
		let buildPolymer = '';

		for (let element = 0; element < polymer.length; element++) {
			const elementToInsert = insertions.get(`${polymer[element]}${polymer[element + 1]}`);

			if (elementToInsert) {
				buildPolymer += polymer[element] + elementToInsert;
			} else {
				buildPolymer += polymer[element];
			}
		}
		polymer = buildPolymer;
	}

	const counts = new Map<string, number>();
	for (const element of polymer) {
		const currentElement = counts.get(element);

		if (currentElement) {
			counts.set(element, currentElement + 1);
		} else {
			counts.set(element, 1);
		}
	}

	const max = Math.max(...counts.values());
	const min = Math.min(...counts.values());

	return max - min;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return createPolymer(input, 10);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
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
			{ name: 'most common - least common after 10 steps', input: testCase, expected: 1588 },
		],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	// onlyTests: true,
});
