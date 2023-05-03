import { getDifficultyObject } from '../src/utils/Difficulty';
import { RiddleStatus } from '../src/utils/Enums';
import type {
	QuestionDisplayDetail,
	QuestionUpsertDetail,
	RiddleDisplayDetail,
	RiddlePreview,
	RiddleUpsertDetail
} from '../src/utils/Types';

const MockUpsertQuestions: QuestionUpsertDetail[] = [
	{
		id: 1,
		number: 2,
		questionText: 'It is blue and annoying, what is it?',
		image: 'public/vite.svg',
		hints: [],
		correctAnswers: '[Smurf]'
	},
	{
		id: 2,
		number: 1,
		questionText:
			'    Ten centuries shall the fortress stand\n' +
			'    Walls of spirit wrapped in walls of fire\n' +
			'    And horned lords shall bowl their head\n' +
			'    To one not yet born, of the darkest sire\n' +
			'\n' +
			'    One century of blood and strife\n' +
			'    The moon shall darken, and none know why\n' +
			'    The resting place at last is found\n' +
			'    Of the Seventh, who soared so high\n' +
			'\n' +
			'    Last daughter of a forlorn line\n' +
			'    Shall guide him into history\n' +
			'    Beneath the crypts prophecies clash\n' +
			'    The war of ancient enemies',
		hints: [
			{ hintText: 'Heroes', order: 1 },
			{ hintText: 'Might & Magic', order: 2 },
			{ hintText: '5. installment', order: 3 }
		],
		correctAnswers: '[Messiah, Dark Messiah]'
	}
];

const MockDisplayQuestions: QuestionDisplayDetail[] = MockUpsertQuestions.map(
	question => {
		const { hints, ...rest } = question;
		const updatedHints = hints.map(hint => ({ ...hint, taken: false }));
		return {
			...rest,
			hints: updatedHints,
			solved: false,
			answers: [],
			available: true
		};
	}
);

export const MockRiddlesPreviews: RiddlePreview[] = [
	{
		id: 1,
		name: 'Anagrammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
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
		state: RiddleStatus.Untouched,
		countryCode: 'de',
		difficulty: getDifficultyObject(4)
	},
	{
		id: 4,
		name: 'Panorama',
		state: RiddleStatus.Untouched,
		countryCode: 'es',
		difficulty: getDifficultyObject(5)
	}
];

export const MockRiddleUpsertDetails: RiddleUpsertDetail[] = [
	{
		id: 1,
		name: 'Anagrammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
		image: 'public/vite.svg',
		state: RiddleStatus.Solved,
		countryCode: 'cz',
		difficulty: getDifficultyObject(1),
		description: 'This is a riddiculous riddle.' + 'Ridduculus!',
		solvedImage: 'public/vite.svg',
		solvedText: 'SOLVED!',
		questions: MockUpsertQuestions
	},
	{
		id: 2,
		name: 'Monogram',
		image: 'public/vite.svg',
		state: RiddleStatus.Unfinished,
		countryCode: 'uk',
		difficulty: getDifficultyObject(3),
		description:
			'\n' +
			'\n' +
			"Today's Doodle celebrates King's Day, a Dutch holiday that honors the Netherlands’s rich cultural heritage.\n" +
			'\n' +
			'Cafes remain open throughout the night the evening before, as crowds gather in the streets to take part in Koningsnacht (King’s Night) festivities. \n' +
			'\n' +
			'Once day breaks, the scent of Dutch treats like special orange tompouce pastries (like the ones in today’s Doodle artwork!) fill the air. \n' +
			'\n' +
			'King’s Day may sound like one big Dutch party. But the holiday is ultimately about honoring joy and community. Friends and families reconnect as they attend street parties, listen to live music, and peruse giant flea markets called vrijmarkt throughout the day. \n' +
			'\n' +
			'Although festivities take place across the country, the most popular ones occur in Amsterdam — where orange boats float through the city’s famous waterways, causing historical canals to burst into color. \n' +
			'\n' +
			'Happy King’s Day to the Dutch! \n',
		solvedImage: '',
		solvedText:
			'Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. \n\n' +
			'Generics are erased and only the last overload signature is propagated into the new function type.',
		questions: [MockUpsertQuestions[0]]
	}
];

const MockRiddleDisplayDetails: RiddleDisplayDetail[] =
	MockRiddleUpsertDetails.map(riddle => {
		const { ...rest } = riddle;
		return {
			...rest,
			questions: MockDisplayQuestions
		};
	});

export const MockUsers: string[] = [
	'adamAnanas',
	'beatka123',
	'cyrílek citrónek',
	'daddy!',
	'Emil',
	'fialkafilip@seznam.cz'
];
