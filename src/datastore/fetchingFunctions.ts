import { getDocs, query, where, orderBy } from 'firebase/firestore';
import type { User } from 'firebase/auth';

import type {
	RiddleDisplayDetail,
	SharingInformationUpsert,
	UserAnswer
} from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleStatus } from '../utils/Statuses';

import {
	questionsCollection,
	riddlesCollection,
	userRiddleInfoCollection,
	usersCollection
} from './firebase';

export const fetchUsers = async () => {
	const qUsers = query(usersCollection, orderBy('email'));
	return await getDocs(qUsers);
};

export const fetchUserRiddleInfo = async (
	linkId: string,
	userEmail: string
) => {
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId),
		where('userEmail', '==', userEmail)
	);
	const infoRes = await getDocs(qSolveInfo);
	return infoRes.docs.length > 0 ? infoRes.docs[0] : undefined; //User may not have answered yet, so there is no record
};

export const fetchRiddleInfo = async (linkId: string) => {
	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	return (await getDocs(qRiddle)).docs[0];
};

export const fetchQuestionsInfo = async (riddleDocId: string) => {
	const qQuestions = query(questionsCollection(riddleDocId));
	return await getDocs(qQuestions);
};

// TODO: Extract common parts with simple detail fetch
export const fetchComplexRiddleDetail = async (
	linkId: string,
	user: User
): Promise<RiddleDisplayDetail> => {
	const riddleInfo = (
		await fetchUserRiddleInfo(linkId, user?.email ?? '')
	)?.data();
	const riddleRes = await fetchRiddleInfo(linkId);

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
	const questionRes = await fetchQuestionsInfo(riddle.id);

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
