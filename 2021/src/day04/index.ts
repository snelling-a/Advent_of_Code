import run from 'aocrunner';

type Item = { number: number; drawn: boolean };
type Line = Item[];
type Board = Line[];
type Boards = Board[];
type Draws = number[];

const parseInput = (rawInput: string) => {
	const [rawDraws, ...rawBoards] = rawInput.split('\n\n');

	const boards: Boards = rawBoards.map((rawBoard) =>
		rawBoard.split('\n').map((line) =>
			line
				.trim()
				.split(/\s+/)
				.map((x) => ({ number: parseInt(x), drawn: false })),
		),
	);

	const draws = rawDraws.split(',').map(Number) as Draws;

	const randomBoard = boards[Math.floor(Math.random() * boards.length)];

	return { draws, boards, randomBoard };
};

const markBoards = (boards: Boards, draw: number) => {
	for (const board of boards) {
		for (const line of board) {
			for (const n of line) {
				if (n.number === draw) {
					n.drawn = true;
				}
			}
		}
	}
};

const isBingo = (board: Board) => {
	let winner = false;

	for (const line of board) {
		let drawn = 0;

		for (const n of line) {
			if (n.drawn) {
				drawn++;
			}
		}

		if (drawn === line.length) {
			winner = true;
		}
	}

	return winner;
};

const getColumns = (board: Board) => board[0].map((_, i) => board.map((line) => line[i]));

const getWinner = (boards: Boards, first: boolean) => {
	let boardsLeft = boards;
	for (const board of boardsLeft) {
		if (boardsLeft.length === 1) {
			return boardsLeft[0];
		}

		const isLineWinner = isBingo(board);
		const columns = getColumns(board);
		const isColumnWinner = isBingo(columns);

		const isWinner = isLineWinner || isColumnWinner;

		if (first && isWinner) {
			return board;
		}

		if (!first && isWinner) {
			const boardIndex = boardsLeft.indexOf(board);
			boardsLeft = boardsLeft.splice(boardIndex, 1);
		}
	}

	return null;
};

const getScore = (winningBoard: Board, lastDraw: number): number => {
	let score = 0;

	for (const line of winningBoard) {
		for (const n of line) {
			if (!n.drawn) {
				score += n.number;
			}
		}
	}

	return score * lastDraw;
};

const part1 = (rawInput: string) => {
	const { draws, boards } = parseInput(rawInput);

	for (const draw of draws) {
		markBoards(boards, draw);

		const winner = getWinner(boards, true);

		if (winner) {
			return getScore(winner, draw);
		}
	}
};

const part2 = (rawInput: string) => {
	const { draws, boards } = parseInput(rawInput);

	for (const draw of draws) {
		markBoards(boards, draw);

		const lastWinner = getWinner(boards, false);
		if (lastWinner) {
			return getScore(lastWinner, draw);
		}
	}

	return;
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
