import type { RiddleStatus } from './Enums';
import type { CountryCode } from './CountryCodes';
import type { Difficulty } from './Difficulty';

export type RiddlePreview = {
	id?: number;
	name: string;
	image?: string;
	state: RiddleStatus;
	countryCode: CountryCode;
	difficulty: Difficulty;
};

export type RiddleUpsertDetail = RiddlePreview & {
	description: string;
	solvedText: string;
	solvedImage?: string;
	questions: QuestionUpsertDetail[];
	sharingInformation: SharingInformationUpsert;
};

export type RiddleDisplayDetail = Omit<RiddleUpsertDetail, 'questions'> & {
	questions: QuestionDisplayDetail[];
};

export type QuestionUpsertDetail = {
	id?: number;
	number: number;
	questionText: string;
	image?: string;
	hints: HintUpsert[];
	correctAnswers: string;
};

export type QuestionDisplayDetail = Omit<QuestionUpsertDetail, 'hints'> & {
	solved: boolean;
	available: boolean;
	answers: UserAnswerDisplay[];
	hints: HintDisplay[];
};

export type HintUpsert = {
	id?: string;
	hintText: string;
	order: number;
};

export type HintDisplay = HintUpsert & {
	taken: boolean;
};

export type UserAnswerDisplay = {
	username: string;
	date: Date;
	correct: boolean;
	answerText: string;
};

export type SharingInformationUpsert = {
	isPublic: boolean;
	link?: string;
	sharedUserIds?: number[];
};
