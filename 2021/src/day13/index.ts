import run from 'aocrunner';

type Input = {
	dots: Dots;
	folds: Fold[];
};
type Dots = Map<
	string,
	{
		x: number;
		y: number;
	}
>;
type Fold = {
	axis: string;
	pos: number;
};

const parseInput = (rawInput: string): Input => {
	const [rawDots, rawFolds] = rawInput.split('\n\n');
	const dots = rawDots.split('\n').map((dot) => {
		const [x, y] = dot.split(',');

		return { x: Number(x), y: Number(y) };
	});
	const dotMap = dots.reduce(
		(dotsMapped, dot) => dotsMapped.set(dot.x + ',' + dot.y, dot),
		new Map(),
	);
	const folds: Fold[] = rawFolds.split('\n').map((fold) => {
		const [axis, pos] = fold.split(' ')[2].split('=');

		return { axis, pos: Number(pos) };
	});

	return { dots: dotMap, folds };
};

const foldPaper = (dots: Dots, fold: Fold) => {
	const foldedPaper: Dots = new Map();
	dots.forEach((dot) => {
		if (fold.axis === 'x' && dot.x > fold.pos) {
			const newX = fold.pos - Math.abs(fold.pos - dot.x);
			foldedPaper.set(`${newX},${dot.y}`, { x: newX, y: dot.y });
		} else if (fold.axis === 'y' && dot.y > fold.pos) {
			const newY = fold.pos - Math.abs(fold.pos - dot.y);
			foldedPaper.set(`${dot.x},${newY}`, { x: dot.x, y: newY });
		} else {
			foldedPaper.set(`${dot.x},${dot.y}`, { x: dot.x, y: dot.y });
		}
	});

	return foldedPaper;
};

const part1 = (rawInput: string) => {
	const { dots, folds } = parseInput(rawInput);

	return foldPaper(dots, folds[0]).size;
};

const part2 = (rawInput: string) => {
	const { dots, folds } = parseInput(rawInput);

	return;
};

const testCase = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

run({
	part1: {
		tests: [{ name: '', input: testCase, expected: 17 }],
		solution: part1,
	},
	part2: {
		tests: [{ name: '', input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
	// onlyTests: true,
});
