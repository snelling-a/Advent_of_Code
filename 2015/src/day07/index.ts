import run from 'aocrunner';

type Input = Map<
    string,
    { command: BitwiseMethods; args: (string | number)[] } | number
>;
type BitwiseMethods = 'AND' | 'OR' | 'NOT' | 'LSHIFT' | 'RSHIFT' | 'ASSIGN';

const parseInput = (rawInput: string): Input =>
    rawInput.split('\n').reduce<Input>((acc, line) => {
        const [instruction, wire] = line.split(' -> ');
        const command = instruction.match(/AND|OR|NOT|LSHIFT|RSHIFT+/g);
        const args = instruction.match(/[a-z0-9]+/g);

        return acc.set(wire, {
            command: (command ? command[0] : 'ASSIGN') as BitwiseMethods,
            args:
                args?.map((arg) => (isNaN(Number(arg)) ? arg : Number(arg))) ??
                [],
        });
    }, new Map());

const BITWISE_METHODS = {
    AND: (a: number, b: number) => a & b,
    OR: (a: number, b: number) => a | b,
    NOT: (a: number) => ~a,
    LSHIFT: (a: number, b: number) => a << b,
    RSHIFT: (a: number, b: number) => a >> b,
    ASSIGN: (a: any) => a,
};

const emulateSignal = (input: Input, wireName: string | number) => {
    if (typeof wireName === 'number') {
        return wireName;
    }

    const wire = input.get(wireName);

    if (typeof wire === 'number' || typeof wire === 'undefined') {
        return wire;
    }

    if (wire.command === 'ASSIGN') {
        input.set(
            wireName,
            BITWISE_METHODS.ASSIGN(emulateSignal(input, wire.args[0])),
        );
    } else if (wire.command === 'NOT') {
        input.set(
            wireName,
            BITWISE_METHODS.NOT(emulateSignal(input, wire.args[0]) as number),
        );
    } else {
        input.set(
            wireName,
            BITWISE_METHODS[wire.command](
                emulateSignal(input, wire.args[0]) as number,
                emulateSignal(input, wire.args[1]) as number,
            ),
        );
    }

    return input.get(wireName) as number;
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    // return emulateSignal(input, 'd');
    // return emulateSignal(input, 'e');
    // return emulateSignal(input, 'f');
    // return emulateSignal(input, 'g');
    // return emulateSignal(input, 'h'); // failing?
    // return emulateSignal(input, 'i'); // failing?
    // return emulateSignal(input, 'x');
    // return emulateSignal(input, 'y');

    return emulateSignal(input, 'a');
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    input.set('b', part1(rawInput) as number);

    return emulateSignal(input, 'a');
};

const testCase = `
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
`;

const tests = [
    { name: 'd', expected: 72 },
    { name: 'e', expected: 507 },
    { name: 'f', expected: 492 },
    { name: 'g', expected: 114 },
    { name: 'h', expected: 65412 },
    { name: 'i', expected: 65079 },
    { name: 'x', expected: 123 },
    { name: 'y', expected: 456 },
];

const runTests = run({
    part1: {
        tests: tests.map(({ name, expected }) => ({
            name,
            input: testCase,
            expected,
        })),

        solution: part1,
    },
    part2: {
        // tests: [{ name: '', input: testCase, expected: '' }],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
