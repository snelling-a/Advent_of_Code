import run from 'aocrunner';
import { createHash } from 'crypto';

const parseInput = (rawInput: string) => rawInput;

const hash = (input: string): string =>
    createHash('md5').update(input).digest('hex');

const getLowestNonce = (input: string, leadingZeros: number): number => {
    const prefix = '0'.repeat(leadingZeros);

    let nonce = 1;
    while (!hash(input + nonce).startsWith(prefix)) {
        nonce++;
    }

    return nonce;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return getLowestNonce(input, 5);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return getLowestNonce(input, 6);
};

const testCases = { a: `abcdef`, b: `pqrstuv` };

run({
    part1: {
        tests: [
            { name: '', input: testCases.a, expected: 609043 },
            { name: '', input: testCases.b, expected: 1048970 },
        ],
        solution: part1,
    },
    part2: {
        // tests: [{ name: '', input: testCase, expected: '' }],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
