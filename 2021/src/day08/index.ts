import run from 'aocrunner';

type Input = SignalOutput[];
type SignalOutput = { signal: Signal; output: Output };
type Signal = Map<string, number>;
type Output = [string, string, string, string];
enum SignalLength {
	one = 2,
	seven = 3,
	four = 4,
	two = 5,
	three = 5,
	five = 5,
	zero = 6,
	six = 6,
	nine = 6,
	eight = 7,
}

const decodeSignal = (rawSignal: string[]) => {
	const sortedSignal = rawSignal.sort((a, b) => a.length - b.length);
	// known patterns
	const one = sortedSignal[0];
	const seven = sortedSignal[1];
	const four = sortedSignal[2];
	const eight = sortedSignal[9];
	const twoThreeFive = [sortedSignal[3], sortedSignal[4], sortedSignal[5]];
	const zeroSixNine = [sortedSignal[6], sortedSignal[7], sortedSignal[8]];


	// 0 and 9 have full overlaps with 1, 6 does not
	const six = zeroSixNine.filter((a) => ![...one].every((b) => a.includes(b)))[0];
	// 0 does not overlap with 4
	const zero = zeroSixNine
		.filter((e) => e !== six)
		.filter((e) => ![...four].every((f) => e.includes(f)))[0];
	const nine = zeroSixNine.filter((e) => e !== zero && e !== six)[0];

	// 2 and 5 do not overlap with 1, 3 does
	const three = twoThreeFive.filter((e) => [...one].every((f) => e.includes(f)))[0];
	// 5 overlaps with 6
	const five = twoThreeFive.filter((e) => [...e].every((f) => six.includes(f)))[0];
	const two = twoThreeFive.filter((e) => e !== three && e !== five)[0];

	return new Map([
		[zero, 0],
		[one, 1],
		[two, 2],
		[three, 3],
		[four, 4],
		[five, 5],
		[six, 6],
		[seven, 7],
		[eight, 8],
		[nine, 9],
	]);
};

const parseInput = (rawInput: string): Input =>
	rawInput.split('\n').map((line) => {
		const [signal, output] = line.split(' | ');

		const rawSignal = signal.split(' ').map((s) => s.split('').sort().join(''));

		return {
			signal: decodeSignal(rawSignal),
			output: output.split(' ').map((o) => o.split('').sort().join('')),
		};
	}) as Input;

const findUniqueNumbersInOutput = (input: Input): number => {
	let total = 0;
	input.forEach((signal) =>
		signal.output.forEach((outputDigit) => {
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

const decodeOutput = ({ signal, output }: SignalOutput) =>
	Number(output.map((digit) => signal.get(digit)).join(''));

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return findUniqueNumbersInOutput(input);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return input.reduce((a, b) => a + decodeOutput(b), 0);
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
		tests: [{ name: 'decode and total', input: testCase, expected: 61229 }],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
