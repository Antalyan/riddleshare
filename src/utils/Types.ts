import type { RiddleStatus } from './Statuses';
import type { CountryCode } from './CountryCodes';
import type { DifficultyValueType } from './Difficulty';

export type QuestionOrder = 'sequence' | 'parallel';
export type Visibility = 'public' | 'private';

export type RiddlePreview = {
	creatorEmail: string;
	difficultyValue: DifficultyValueType;
	id?: string;
	image?: string;
	imageFile?: Blob;
	language: CountryCode;
	linkId: string;
	name: string;
	state?: RiddleStatus;
};

export type RiddleUpsertDetail = Omit<RiddlePreview, 'state'> & {
	description: string;
	solvedText: string;
	solvedImage?: string;
	solvedImageFile?: Blob;
	questions: QuestionUpsertDetail[];
	questionOrder?: QuestionOrder;
	sharingInformation: SharingInformationUpsert;
};

export type RiddleDisplayDetailSimple = Omit<
	RiddleUpsertDetail,
	'questions' | 'solvedText' | 'solvedImage'
> & {
	creatorEmail: string;
	numberOfQuestions: number;
	state: RiddleStatus;
	solvedQuestions: number;
};

export type RiddleDisplayDetail = Omit<RiddleUpsertDetail, 'questions'> &
	RiddleDisplayDetailSimple & {
		questions: QuestionDisplayDetail[];
	};

export type TextType = {
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
