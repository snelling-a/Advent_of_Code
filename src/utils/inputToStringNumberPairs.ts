export const inputToStringNumberPairs = <T extends string>(
	rawInput: string,
): [T, number][] =>
		rawInput
			.split('\n')
			.map((line) => [line.split(' ')[0] as T, parseInt(line.split(' ')[1])]);
