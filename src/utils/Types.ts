import type { RiddleStatus } from './Enums.ts';
import type { CountryCode } from './CountryCodes.ts';
import type { Difficulty } from './Difficulty.ts';

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
};

export type RiddleDisplayDetail = Omit<RiddleUpsertDetail, 'questions'> & {
	questions: QuestionDisplayDetail[];
};

export type TextType = {
	id?: number;
	text: string;
};

export type QuestionUpsertDetail = {
	id?: number;
	number: number;
	text: string;
	image?: string;
	hints: HintUpsert[];
	correctAnswers: TextType[];
};

export type QuestionDisplayDetail = Omit<QuestionUpsertDetail, 'hints'> & {
	solved: boolean;
	available: boolean;
	answers: UserAnswer[];
	hints: HintDisplay[];
};

export type HintUpsert = {
	id?: string;
	text: string;
	order: number;
};

export type HintDisplay = HintUpsert & {
	taken: boolean;
};

export type UserAnswer = {
	username: string;
	date: Date;
	correct: boolean;
	text: string;
};

export type SharingInformation = {};
