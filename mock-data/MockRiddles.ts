import { CountryCode } from '../src/utils/CountryCodes';
import {
	Difficulty,
	DifficultyType,
	getDifficultyObject
} from '../src/utils/Difficulty';
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
		countryCode: 'CZ',
		difficulty: getDifficultyObject(1)
	},
	{
		id: 2,
		name: 'Monogram',
		image: 'public/vite.svg',
		state: RiddleStatus.Unfinished,
		countryCode: 'GB',
		difficulty: getDifficultyObject(3)
	},
	{
		id: 3,
		name: 'Diagram',
		image: 'public/vite.svg',
		state: RiddleStatus.Untouched,
		countryCode: 'CO',
		difficulty: getDifficultyObject(2)
	}
];
