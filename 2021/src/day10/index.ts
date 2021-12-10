import run from 'aocrunner';

type Input = Line[];
type Line = SyntaxChar[];
type SyntaxChar = keyof typeof OpeningChar | keyof typeof ClosingChar;
enum OpeningChar {
	'(',
	'[',
	'{',
	'<',
}
enum ClosingChar {
	')',
	']',
	'}',
	'>',
}

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => line.split('')) as Input;

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
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
