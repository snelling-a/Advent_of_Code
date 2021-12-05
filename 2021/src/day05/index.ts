import run from 'aocrunner';

type Point = { x: number; y: number };
type Line = { start: Point; end: Point };
type Input = Line[];
interface SeaFloorMap {
	seaFloorMap: Map<string, number>;
}

class SeaFloorMap {
	constructor() {
		this.seaFloorMap = new Map<string, number>();
	}

	addPoint(p: Point) {
		const pointString = JSON.stringify(p);
		const current = this.seaFloorMap.get(pointString);

		if (current) {
			this.seaFloorMap.set(pointString, current + 1);
		} else {
			this.seaFloorMap.set(pointString, 1);
		}
	}

	drawLine(line: Line) {
		let x = line.start.x;
		let y = line.start.y;
		this.addPoint({ x, y });

		while (x !== line.end.x || y !== line.end.y) {
			if (x > line.end.x) {
				x--;
			}
			if (x < line.end.x) {
				x++;
			}

			if (y > line.end.y) {
				y--;
			}
			if (y < line.end.y) {
				y++;
			}

			this.addPoint({ x, y });
		}
	}

	getOverlaps() {
		let overlaps = 0;
		this.seaFloorMap.forEach((value) => {
			if (value > 1) {
				overlaps++;
			}
		});

		return overlaps;
	}
}

const parseInput = (rawInput: string): Input =>
	rawInput
		.trim()
		.split('\n')
		.map((line) => {
			const [start, end] = line
				.split('->')
				.map((r) => r.split(',').map((n) => parseInt(n, 10)));

			return {
				start: { x: start[0], y: start[1] },
				end: { x: end[0], y: end[1] },
			};
		});

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const seaFloorMap = new SeaFloorMap();

	input.forEach((line) => {
		if (line.start.x === line.end.x || line.start.y === line.end.y) {
			seaFloorMap.drawLine(line);
		}
	});

	return seaFloorMap.getOverlaps();
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return;
};

const testCase = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

run({
	part1: {
		tests: [{ input: testCase, expected: 5 }],
		solution: part1,
	},
	part2: {
		tests: [{ input: testCase, expected: '' }],
		solution: part2,
	},
	trimTestInputs: true,
});
