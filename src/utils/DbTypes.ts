import type { Timestamp } from 'firebase/firestore';

import type { CountryCode } from './CountryCodes';
import type { DifficultyType } from './Difficulty';
import type { RiddleStatus } from './Statuses';

export type RiddleDb = {
	linkId: string;
	name: string;
	description: string;
	image?: string;
	language: CountryCode;
	difficultyValue: DifficultyType;
	creatorEmail: string;
	createTime: Timestamp;
	solvedText: string;
	solvedImage?: string;
	isSequential?: boolean;
	numberOfQuestions: number;
	sharingInformation: {
		isPublic: boolean;
		sharedUsers?: string[];
	};
};

export type QuestionDb = {
	order: number;
	questionText?: string;
	questionImage?: string;
	hints: { order: number; hintText: string }[];
	correctAnswers: string[];
};

export type UserRiddleInfoDb = {
	userEmail: string;
	riddleLinkId: string;
	state: RiddleStatus;
	questions: Record<
		number, //questionId
		{ solved: boolean; answers: string[]; hintsTaken: number }
	>;
};

export type UserDb = {
	email: string;
	password: string;
};
