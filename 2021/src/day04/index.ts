import run from 'aocrunner';

type Input = { draws: Draws; boards: Board[] };
type Item = { number: number; drawn: boolean };
type Board = { winner: boolean; board: Item[][] };
type Draws = number[];

const parseInput = (rawInput: string): Input => {
	const [rawDraws, ...rawBoards] = rawInput.split('\n\n');

	const boards: Board[] = rawBoards.map((rawBoard) => ({
		winner: false,
		board: rawBoard.split('\n').map((row) =>
			row
				.split(' ')
				.filter((e) => e.length > 0)
				.map((x) => ({ drawn: false, number: parseInt(x) } as Item)),
		),
	}));

	const draws = rawDraws.split(',').map(Number) as Draws;

	return { draws, boards };
};

const playBingo = (input: Input, first = true) => {
	const numberOfRows = input.boards[0].board.length;
	const numberOfColumns = input.boards[0].board[0].length;

	for (const draw of input.draws) {
		for (const board of input.boards) {
			let sum = 0;
			for (const row of board.board) {
				for (const item of row) {
					if (item.number === draw) {
						item.drawn = true;
					}
					if (!item.drawn) {
						sum += item.number;
					}
				}

				if (row.every((item) => item.drawn)) {
					board.winner = true;
				}
			}

			for (let i = 0; i < numberOfRows; i++) {
				let drawnInColumn = 0;
				for (const row of board.board) {
					if (row[i].drawn) {
						drawnInColumn += 1;
					}
				}
				if (drawnInColumn === numberOfRows) {
					board.winner = true;
				}
			}
			const winner = first
				? input.boards.some((board) => board.winner)
				: input.boards.every((board) => board.winner);

			if (winner) {
				return sum * draw;
			}
		}
	}
};

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return playBingo(input);
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return playBingo(input, false);
};

const testCase = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

run({
	part1: {
		tests: [{ input: testCase, expected: 4512 }],
		solution: part1,
	},
	part2: {
		tests: [{ input: testCase, expected: 1924 }],
		solution: part2,
	},
	trimTestInputs: true,
});
