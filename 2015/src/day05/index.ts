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

const naughtyOrNice2 = (string: string) => {
    const hasPairOfLetters = /(\w{2}).*\1/.test(string);

    const hasLetterBetween = /(\w)\w\1/.test(string);

    return hasPairOfLetters && hasLetterBetween;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input.filter(naughtyOrNice).length;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return input.filter(naughtyOrNice2).length;
};

run({
    part1: {
        tests: [
            {
                name: '',
                input: `
        ugknbfddgicrmopn
        jchzalrnumimnmhp
        haegwjzuvuyypxyu
        dvszwmarrgswjxmb
        `,
                expected: 1,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                name: '',
                input: `
        qjhvhtzxzqqjkmpb
        uurcxstgmygtbstg
        ieodomkazucvgmuy
        `,
                expected: 1,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
