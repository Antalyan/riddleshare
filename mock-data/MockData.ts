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
		image: '/public/RiddleMeThis.jpeg',
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
		name: 'Anagram - Really long riddle name',
		image: '/public/vite.svg',
		state: RiddleStatus.Solved,
		countryCode: 'cz',
		difficulty: getDifficultyObject(1)
	},
	{
		id: 2,
		name: 'Monogram',
		image: '/public/RiddleMeThis.jpeg',
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
		name: 'Anagram - Really long riddle name',
		image: '/public/vite.svg',
		state: RiddleStatus.Solved,
		countryCode: 'cz',
		difficulty: getDifficultyObject(1),
		description:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Integer tempor. Quisque tincidunt scelerisque libero. Duis viverra diam non justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
		solvedImage: '/public/RiddleMeThis.jpeg',
		solvedText: 'SOLVED!',
		questions: MockUpsertQuestions,
		sharingInformation: { isPublic: false, sharedUserIds: [1, 2] }
	},
	{
		id: 2,
		name: 'Monogram',
		image: '/public/RiddleMeThis.jpeg',
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
			'Happy King’s Day to the Dutch! \n',
		solvedImage: '',
		solvedText:
			'Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. \n\n' +
			'Generics are erased and only the last overload signature is propagated into the new function type.',
		questions: [MockUpsertQuestions[0]],
		sharingInformation: { isPublic: true, link: '' }
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
