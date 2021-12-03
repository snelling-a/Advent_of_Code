import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const binaryLength = input[0].length;

	let [gamma, epsilon] = ['', ''];

	for (let i = 0; i < binaryLength; i++) {
		let [gammaCount, epsilonCount] = [0, 0];

		for (const binary of input) {
			if (binary[i] === '1') {
				gammaCount++;
			} else {
				epsilonCount++;
			}
		}
		if (gammaCount > epsilonCount) {
			gamma = `${gamma}1`;
			epsilon = `${epsilon}0`;
		} else {
			gamma = `${gamma}0`;
			epsilon = `${epsilon}1`;
		}
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const binaryLength = input[0].length;

	let nextRound = input;
	for (let i = 0; i < binaryLength; i++) {
		if (nextRound.length === 1) {
			return;
		}

		let [ones, zeros] = [0, 0];
		for (let j = 0; j < nextRound.length; j++) {
			switch (nextRound[j][i]) {
				case '1':
					ones++;
					break;
				case '0':
					zeros++;
					break;
				default:
					break;
			}
		}

		const value = ones >= zeros ? '1' : '0';

		nextRound = nextRound.reduce<Array<string>>((a, b) => {
			if (b[i] === value) {
				return [...a, b];
			}

			return a;
		}, []);
	}
	const oxygenGeneratorRating = parseInt(nextRound[0], 2);

	return oxygenGeneratorRating;
};

const testCase = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

run({
	part1: {
		tests: [{ input: testCase, expected: 198 }],
		solution: part1,
	},
	part2: {
		tests: [{ input: testCase, expected: 230 }],
		solution: part2,
	},
	trimTestInputs: true,
});
