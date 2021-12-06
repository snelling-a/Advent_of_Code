import run from 'aocrunner';
import { spawn } from 'child_process';

type Input = number[];

const parseInput = (rawInput: string): Input => rawInput.split(',').map(Number);

const getStartingAges = (startingLanternfish: Input) => {
	const lanternfishAges = Array(9).fill(0);

	for (let i = 0; i < startingLanternfish.length; i++) {
		lanternfishAges[startingLanternfish[i]]++;
	}

	return lanternfishAges;
};

const modelLanternfishGrowthRate = (startingLanternfish: Input, days: number) => {
	const lanternfishAges = getStartingAges(startingLanternfish);

	for (let day = 0; day < days; day++) {
		const dayZeroFish = lanternfishAges.shift();
		lanternfishAges[6] += dayZeroFish;
		lanternfishAges[8] = dayZeroFish;
	}

	return lanternfishAges.reduce((a, b) => a + b);
};

const part1 = (rawInput: string) => {
	const startingLanternfish = parseInput(rawInput);

	return modelLanternfishGrowthRate(startingLanternfish, 80);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = '3,4,3,1,2';

run({
	part1: {
		tests: [{ input: testCase, expected: 5934 }],
		solution: part1,
	},
	// part2: {
	// 	tests: [{ input: testCase, expected: '' }],
	// 	solution: part2,
	// },
	trimTestInputs: true,
});
