import run from 'aocrunner';

type Input = string[][];

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => line.split('')) as Input;

const pairs = new Map<string, string>([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['<', '>'],
]);

const points = new Map<string, number>([
	[')', 3],
	[']', 57],
	['}', 1197],
	['>', 25137],
]);

const getFirstCorruptedChar = (input: Input) => {
	let total = 0;
	for (const line of input) {
		const expectedClosers: string[] = [];

		for (const char of line) {
			if (pairs.has(char)) {
				expectedClosers.push(pairs.get(char) as string);
			} else {
				const expected = expectedClosers.pop();
				if (expected != char) {
					total += points.get(char) as number;
					break;
				}
			}
		}
	}

	return total;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return getFirstCorruptedChar(input);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

run({
	part1: {
		tests: [{ name: 'syntax errors', input: testCase, expected: 26397 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
