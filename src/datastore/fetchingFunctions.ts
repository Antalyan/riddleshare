import type { User } from 'firebase/auth';
import type { QueryConstraint } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';

import type {
	RiddleDisplayDetail,
	RiddleDisplayDetailSimple,
	RiddlePreview,
	SharingInformationUpsert,
	UserAnswer
} from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleStatus } from '../utils/Statuses';

import {
	fetchQuestions,
	fetchRiddle,
	fetchRiddles,
	fetchUserRiddleInfo
} from './fetchingQueries';
import { riddlesCollection, userRiddleInfoCollection } from './firebase';

// TODO: Extract common parts with simple detail fetch
export const fetchRiddleComplexDetail = async (
	linkId: string,
	user: User
): Promise<RiddleDisplayDetail> => {
	const riddleInfo = (
		await fetchUserRiddleInfo(linkId, user?.email ?? '')
	)?.data();
	const riddleRes = await fetchRiddle(linkId);

	const {
		name,
		description,
		image,
		language,
		difficultyValue,
		numberOfQuestions,
		solvedText,
		solvedImage,
		sharingInformation,
		isSequential
	} = riddleRes.data();
	const newSharingInfo: SharingInformationUpsert = {
		visibility: sharingInformation.isPublic ? 'public' : 'private',
		sharedUsers: sharingInformation.sharedUsers
	};
	const riddle: RiddleDisplayDetail = {
		id: riddleRes.id,
		name,
		linkId,
		description,
		image,
		language,
		difficulty: getDifficultyObject(difficultyValue),
		difficultyValue,
		numberOfQuestions,
		solvedText,
		solvedImage,
		sharingInformation: newSharingInfo,
		state: riddleInfo ? riddleInfo.state : RiddleStatus.Untouched,
		solvedQuestions: riddleInfo
			? Object.entries(riddleInfo.questions).filter(([, value]) => value.solved)
					.length
			: 0,
		questions: [],
		questionOrder: isSequential ? 'sequence' : 'parallel'
	};

	if (!riddle.id) {
		throw Error('Undefined riddle id!');
	}
	const questionRes = await fetchQuestions(riddle.id);

	questionRes.docs.forEach(doc => {
		const { order, questionText, questionImage, hints, correctAnswers } =
			doc.data();
		const questionInfo = riddleInfo?.questions[order];

		const readAnswers: UserAnswer[] = questionInfo
			? questionInfo.answers.map(a => ({
					answerText: a,
					username: riddleInfo.userEmail,
					correct: correctAnswers.includes(a)
			  }))
			: [];

		riddle.questions.push({
			order,
			questionText,
			questionImage,
			solved: !!riddleInfo && !!questionInfo && questionInfo.solved,
			available:
				riddle.questionOrder === 'parallel' ||
				order === 1 ||
				(!!riddleInfo && riddleInfo.questions[order - 1]?.solved),
			answers: readAnswers,
			correctAnswers,
			hints,
			hintsTaken: questionInfo?.hintsTaken ?? 0
		});
	});
	console.log(riddle);
	return riddle;
};

export const fetchRiddlePreviews = async (
	...queryConstraints: QueryConstraint[]
): Promise<RiddlePreview[]> => {
	const riddleDbData = await fetchRiddles(...queryConstraints);
	return riddleDbData.map(riddle => {
		const { linkId, name, image, language, difficultyValue } = riddle.data();
		return {
			linkId,
			name,
			image,
			language,
			difficulty: getDifficultyObject(difficultyValue)
		};
	});
};

export const fetchRiddleSimpleDetail = async (
	linkId: string,
	user: User
): Promise<RiddleDisplayDetailSimple> => {
	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId),
		where('userEmail', '==', user?.email)
	);

	const riddleDoc = await fetchRiddle(linkId);
	const {
		name,
		description,
		image,
		language,
		difficultyValue,
		numberOfQuestions,
		sharingInformation
	} = riddleDoc.data();
	const newSharingInfo: SharingInformationUpsert = {
		visibility: sharingInformation.isPublic ? 'public' : 'private',
		sharedUsers: sharingInformation.sharedUsers
	};

	const solvingInfo = await fetchUserRiddleInfo(linkId, user?.email ?? '');
	const solvedQuestions = solvingInfo
		? Object.entries(solvingInfo.data().questions).filter(
				([, value]) => value.solved
		  ).length
		: 0; //TODO: change solvedQuestions format in the whole file from number to array because of parallel scoping

	return {
		linkId,
		name,
		description,
		image,
		language,
		difficulty: getDifficultyObject(difficultyValue),
		numberOfQuestions,
		state: solvingInfo ? solvingInfo.data().state : RiddleStatus.Untouched,
		solvedQuestions,
		sharingInformation: newSharingInfo
	};
};
