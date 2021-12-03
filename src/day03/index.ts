import { inputToArrayOfNumbers, inputToStringNumberPairs } from '@utils';
import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split('\n');

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

/*
 * gamma =
 * epsilon =
 */
const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const binaryLength = input[0].length;

	let [gamma, epsilon] = ['0', '0'];

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
			gamma += '1';
			epsilon += '0';
		} else {
			gamma += '0';
			epsilon += '1';
		}
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

run({
	part1: {
		tests: [{ input: testCase, expected: 198 }],
		solution: part1,
	},
	part2: {
		// tests: [{ input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
});
