import run from 'aocrunner';

type Input = SignalOutput[];
type SignalOutput = [Signal, Output];
type Signal = [string, string, string, string, string, string, string, string, string, string];
type Output = [string, string, string, string];
enum SignalLength {
	zero = 6,
	one = 2,
	two = 5,
	three = 5,
	four = 4,
	five = 5,
	six = 6,
	seven = 3,
	eight = 7,
	nine = 6,
}

const parseInput = (rawInput: string): Input =>
	rawInput
		.split('\n')
		.map((line) => line.split(' | ').map((s) => s.split(' ')))
		.map(([signal, output]) => [
			sortSignalOrOutput(signal as Signal),
			sortSignalOrOutput(output as Output),
		]) as Input;

const sortSignalOrOutput = (signalOrOutput: Signal | Output) => {
	return signalOrOutput.map((code) => code.split('').sort().join(''));
};

const getSignalOutput = (input: Input): Output[] =>
	input.map(([, output]) => output).reduce<Output[]>((acc, curr) => [...acc, curr], []);

const findUniqueNumbersInOutput = (output: Output[]): number => {
	let total = 0;
	output.forEach((outputString) =>
		outputString.forEach((outputDigit) => {
			outputDigit.length === SignalLength.one ||
			outputDigit.length === SignalLength.four ||
			outputDigit.length === SignalLength.seven ||
			outputDigit.length === SignalLength.eight
				? total++
				: total;
		}),
	);

	return total;
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const output = getSignalOutput(input);

	return findUniqueNumbersInOutput(output);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

run({
	part1: {
		tests: [{ name: 'find unique numbers in output', input: testCase, expected: 26 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: 61229 }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: true,
});
