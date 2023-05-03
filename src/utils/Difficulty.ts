export type Difficulty = {
	name: string;
	value: DifficultyType;
	color: string;
};

export const Difficulties = [
	{ name: 'Trivial', value: 1, color: '#4dd0e1' },
	{ name: 'Easy', value: 2, color: '#4caf50' },
	{ name: 'Moderate', value: 3, color: '#ffff00' },
	{ name: 'Hard', value: 4, color: '#ffab00' },
	{ name: 'Extreme', value: 5, color: '#bf360c' }
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
