import type { RiddleStatus } from './Statuses';
import type { CountryCode } from './CountryCodes';
import type { Difficulty } from './Difficulty';

export type QuestionOrder = 'sequence' | 'parallel';
export type Visibility = 'public' | 'private';

export type RiddlePreview = {
	id?: string;
	//TODO: Make displays based on linkId instead of dbId
	linkId: string;
	name: string;
	image?: string;
	state?: RiddleStatus; //Not needed for My riddles
	language: CountryCode;
	difficulty: Difficulty;
};

export type RiddleUpsertDetail = Omit<RiddlePreview, 'state'> & {
	description: string;
	solvedText: string;
	solvedImage?: string;
	questions: QuestionUpsertDetail[];
	questionOrder?: QuestionOrder;
	sharingInformation: SharingInformationUpsert;
};

export type RiddleDisplayDetail = Omit<RiddleUpsertDetail, 'questions'> & {
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
	hintText: string;
	order?: number;
};

export type HintDisplay = HintUpsert & {
	taken: boolean;
};

export type UserAnswer = {
	username: string;
	date: Date;
	correct: boolean;
	answerText: string;
};

export type SharingInformationUpsert = {
	visibility: Visibility;
	sharedUsers?: string[];
};
