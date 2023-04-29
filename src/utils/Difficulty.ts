export type Difficulty = {
	name: string;
	value: DifficultyType;
	color: string;
};

export const Difficulties = [
	{ name: 'trivial', value: 1, color: '#4dd0e1' },
	{ name: 'easy', value: 2, color: '#4caf50' },
	{ name: 'moderate', value: 3, color: '#ffff00' },
	{ name: 'hard', value: 4, color: '#ff5722' },
	{ name: 'extreme', value: 5, color: '#212121' }
] as const;

export type DifficultyType = (typeof Difficulties)[number]['value'];

export const getDifficultyObject = (
	difficultyValue: DifficultyType
): Difficulty => {
	const diff = Difficulties.find(diff => diff.value === difficultyValue);
	if (diff === undefined) {
		throw new Error(`Invalid difficulty value ${difficultyValue} provided.`);
	}
	return diff;
};
