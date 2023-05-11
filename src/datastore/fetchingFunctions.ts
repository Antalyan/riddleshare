import type { User } from 'firebase/auth';
import type { QueryConstraint } from 'firebase/firestore';

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
	fetchUserRiddleInfo,
	fetchUserRiddleInfos
} from './fetchingQueries';

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
		creatorEmail,
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
		creatorEmail,
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
	user: User | undefined,
	...queryConstraints: QueryConstraint[]
): Promise<RiddlePreview[]> => {
	const riddleDbData = await fetchRiddles(...queryConstraints);
	const previews: RiddlePreview[] = riddleDbData.map(riddle => {
		const { linkId, name, image, language, difficultyValue } = riddle.data();
		return {
			linkId,
			name,
			image,
			language,
			difficulty: getDifficultyObject(difficultyValue),
			state: RiddleStatus.Untouched
		};
	});

	// Fetch answer info for preview icon
	if (user) {
		const riddleLinkIds = previews.map(riddle => riddle.linkId);
		const answerDataDoc = await fetchUserRiddleInfos(
			riddleLinkIds,
			user.email!
		);
		if (answerDataDoc) {
			previews.forEach(p => {
				const answer = answerDataDoc.find(
					doc => doc.data().riddleLinkId === p.linkId
				);
				if (answer) {
					p.state = answer.data().state;
				}
			});
		}
	}
	return previews;
};

export const fetchRiddleSimpleDetail = async (
	linkId: string,
	user: User
): Promise<RiddleDisplayDetailSimple> => {
	// const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	// const qSolveInfo = query(
	// 	userRiddleInfoCollection,
	// 	where('riddleLinkId', '==', linkId),
	// 	where('userEmail', '==', user?.email)
	// );

	const riddleDoc = await fetchRiddle(linkId);
	const {
		name,
		creatorEmail,
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
		creatorEmail,
		description,
		image,
		language,
		difficulty: getDifficultyObject(difficultyValue),
		difficultyValue,
		numberOfQuestions,
		state: solvingInfo ? solvingInfo.data().state : RiddleStatus.Untouched,
		solvedQuestions,
		sharingInformation: newSharingInfo
	};
};
