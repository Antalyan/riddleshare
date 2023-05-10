import type { RiddleStatus } from './Statuses';
import type { CountryCode } from './CountryCodes';
import type { Difficulty, DifficultyType } from './Difficulty';

export type QuestionOrder = 'sequence' | 'parallel';
export type Visibility = 'public' | 'private';

//TODO: Add author to riddle preview & detail

export type RiddlePreview = {
	id?: string;
	linkId: string;
	name: string;
	image?: string;
	state?: RiddleStatus;
	language: CountryCode;
	difficulty: Difficulty;
};

export type RiddleUpsertDetail = Omit<RiddlePreview, 'state'> & {
	description: string;
	difficultyValue: DifficultyType;
	solvedText: string;
	solvedImage?: string;
	questions: QuestionUpsertDetail[];
	questionOrder?: QuestionOrder;
	sharingInformation: SharingInformationUpsert;
};

export type RiddleDisplayDetailSimple = Omit<
	RiddleUpsertDetail,
	'questions' | 'solvedText' | 'solvedImage'
> & {
	numberOfQuestions: number;
	state: RiddleStatus;
	solvedQuestions: number;
};

export type RiddleDisplayDetail = Omit<RiddleUpsertDetail, 'questions'> &
	RiddleDisplayDetailSimple & {
		questions: QuestionDisplayDetail[];
	};

type TextType = {
	text: string;
};

export type QuestionUpsertDetail = {
	id?: string;
	order?: number;
	questionText?: string;
	questionImage?: string;
	hints: Hint[];
	correctAnswers: TextType[];
};

export type QuestionDisplayDetail = Omit<
	QuestionUpsertDetail,
	'hints' | 'correctAnswers' | 'order'
> & {
	order: number;
	solved: boolean;
	available: boolean;
	answers: UserAnswer[];
	correctAnswers: string[];
	hints: Hint[];
	hintsTaken: number;
};

export type Hint = {
	hintText: string;
	order?: number;
};

export type UserAnswer = {
	username: string;
	correct: boolean;
	answerText: string;
};

export type SharingInformationUpsert = {
	visibility: Visibility;
	sharedUsers?: string[];
};
