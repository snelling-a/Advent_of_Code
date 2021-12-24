import run from 'aocrunner';

type Light = { row: number; column: number };
type Range = { from: Light; to: Light };
type Action = 'turn on' | 'turn off' | 'toggle';
type Instruction = [Action, Range];
type Input = Instruction[];

const parseInput = (rawInput: string): Input =>
    rawInput.split('\n').map((line) => {
        const match = line.match(
            /(?<action>turn on|turn off|toggle) (?<fromRow>\d+),(?<fromColumn>\d+) through (?<toRow>\d+),(?<toColumn>\d+)/,
        );

        const { action, fromRow, fromColumn, toRow, toColumn } =
            match?.groups ?? {};

        return [
            action,
            {
                from: { row: Number(fromRow), column: Number(fromColumn) },
                to: { row: Number(toRow), column: Number(toColumn) },
            },
        ] as Instruction;
    });

const create2DArray = <T>(rows: number, cols: number, defaultValue: T): T[][] =>
    Array.from(Array(rows), () => Array(cols).fill(defaultValue));

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const lights = create2DArray(1000, 1000, false);

    for (const [action, { from, to }] of input) {
        for (let row = from.row; row <= to.row; row++) {
            for (let column = from.column; column <= to.column; column++) {
                switch (action) {
                    case 'turn on':
                        lights[row][column] = true;
                        break;
                    case 'turn off':
                        lights[row][column] = false;
                        break;
                    case 'toggle':
                        lights[row][column] = !lights[row][column];
                        break;
                }
            }
        }
    }

    return lights.reduce((acc, row) => {
        const lit = row.filter(Boolean).length;
        return acc + lit;
    }, 0);
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const lights = create2DArray(1000, 1000, 0);

    for (const [action, { from, to }] of input) {
        for (let row = from.row; row <= to.row; row++) {
            for (let column = from.column; column <= to.column; column++) {
                switch (action) {
                    case 'turn on':
                        lights[row][column]++;
                        break;
                    case 'turn off':
                        if (lights[row][column] > 0) {
                            lights[row][column]--;
                        }
                        break;
                    case 'toggle':
                        lights[row][column] += 2;
                        break;
                }
            }
        }
    }

    return lights.reduce((acc, row) => {
        const lit = row.reduce((acc, light) => acc + light, 0);
        return acc + lit;
    }, 0);
};

run({
    part1: {
        tests: [
            {
                name: 'every light',
                input: `turn on 0,0 through 999,999`,
                expected: 1000000,
            },
            {
                name: 'first line of 1000 lights',
                input: `toggle 0,0 through 999,0`,
                expected: 1000,
            },
            {
                name: 'leave off the middle 4 lights',
                input: `turn off 499,499 through 500,500`,
                expected: 0,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                name: 'increase total brightness by 1',
                input: `turn on 0,0 through 0,0`,
                expected: 1,
            },
            {
                name: 'increase total brightness by 2000000',
                input: `toggle 0,0 through 999,999`,
                expected: 2000000,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
