import run from 'aocrunner';

type Input = string[];

const parseInput = (rawInput: string): Input => rawInput.split('\n');

const naughtyOrNice = (string: string) => {
    const hasVowels = () => {
        const vowelCount = string.match(/[aeiou]/g)?.length || 0;
        return vowelCount >= 3;
    };

    const hasConsecutiveLetters = /(\w)\1/.test(string);

    const hasBadStrings = /(ab|cd|pq|xy)/.test(string);

    return hasVowels() && hasConsecutiveLetters && !hasBadStrings;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input.reduce((acc, string) => {
        if (naughtyOrNice(string)) {
            return acc + 1;
        }
        return acc;
    }, 0);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return;
};

const testCase = `
ugknbfddgicrmopn
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb
`;

run({
    part1: {
        tests: [{ name: '', input: testCase, expected: 1 }],
        solution: part1,
    },
    part2: {
        tests: [{ name: '', input: testCase, expected: '' }],
        solution: part2,
    },
    trimTestInputs: true,
    // onlyTests: true,
});
