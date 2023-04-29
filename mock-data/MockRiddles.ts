import type { CountryCode } from '../src/utils/CountryCodes';
import type { Difficulty } from '../src/utils/Difficulty';
import { getDifficultyObject } from '../src/utils/Difficulty';
import { RiddleStatus } from '../src/utils/Enums';

//TODO: Move type declaration to types

type Riddle = {
	id: number;
	name: string;
	image: string;
	state: RiddleStatus;
	countryCode: CountryCode;
	difficulty: Difficulty;
};

export const MockRiddles: Riddle[] = [
	{
		id: 1,
		name: 'Anagram',
		image: 'public/vite.svg',
		state: RiddleStatus.Solved,
		countryCode: 'cz',
		difficulty: getDifficultyObject(1)
	},
	{
		id: 2,
		name: 'Monogram',
		image: 'public/vite.svg',
		state: RiddleStatus.Unfinished,
		countryCode: 'uk',
		difficulty: getDifficultyObject(3)
	},
	{
		id: 3,
		name: 'Diagram',
		image: 'public/vite.svg',
		state: RiddleStatus.Untouched,
		countryCode: 'de',
		difficulty: getDifficultyObject(2)
	}
];
