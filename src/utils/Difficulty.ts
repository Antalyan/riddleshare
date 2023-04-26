export type Difficulty = {
	name: string;
	value: DifficultyType;
	color: string;
};

export const Difficulties = [
	{ name: 'very easy', value: 1, color: '#4caf50' },
	{ name: 'easy', value: 2, color: '#8bc34a' },
	{ name: 'medium', value: 3, color: '#ffff00' },
	{ name: 'hard', value: 4, color: '#ff9100' },
	{ name: 'extremely hard', value: 5, color: '#ff5722' }
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
