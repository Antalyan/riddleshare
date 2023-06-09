import type { QueryConstraint } from 'firebase/firestore';

import type {
	RiddleDisplayDetail,
	RiddleDisplayDetailSimple,
	RiddlePreview,
	RiddleUpsertDetail,
	SharingInformationUpsert,
	TextType,
	UserAnswer
} from '../utils/Types';
import { RiddleStatus } from '../utils/Statuses';

import {
	fetchQuestions,
	fetchRiddle,
	fetchRiddles,
	fetchUserRiddleInfo,
	fetchUserRiddleInfos
} from './fetchingQueries';

export const fetchRiddleComplexDetail = async (
	linkId: string,
	userEmail: string
): Promise<RiddleDisplayDetail | null> => {
	const riddleRes = await fetchRiddle(linkId);

	if (!riddleRes) {
		// Riddle with given linkId does not exist
		return null;
	}

	const riddleInfo = (await fetchUserRiddleInfo(linkId, userEmail))?.data();

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

	questionRes.forEach(doc => {
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
	return riddle;
};

export const fetchRiddlePreviews = async (
	userEmail: string | undefined,
	...queryConstraints: QueryConstraint[]
): Promise<RiddlePreview[]> => {
	const riddleDbData = await fetchRiddles(...queryConstraints);
	const previews: RiddlePreview[] = riddleDbData.map(riddle => {
		const { creatorEmail, linkId, name, image, language, difficultyValue } =
			riddle.data();
		return {
			creatorEmail,
			difficultyValue,
			image,
			language,
			linkId,
			name,
			state: RiddleStatus.Untouched
		};
	});

	// Fetch answer info for preview icon
	if (userEmail) {
		const riddleLinkIds = previews.map(riddle => riddle.linkId);
		const answerDataDoc = await fetchUserRiddleInfos(riddleLinkIds, userEmail);
		if (answerDataDoc.length > 0) {
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
	userEmail: string
): Promise<RiddleDisplayDetailSimple | null> => {
	const riddleDoc = await fetchRiddle(linkId);

	if (!riddleDoc) {
		// Riddle with given linkId does not exist
		return null;
	}

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

	const solvingInfo = await fetchUserRiddleInfo(linkId, userEmail);
	const solvedQuestions = solvingInfo
		? Object.entries(solvingInfo.data().questions).filter(
				([, value]) => value.solved
		  ).length
		: 0;

	return {
		linkId,
		name,
		creatorEmail,
		description,
		image,
		language,
		difficultyValue,
		numberOfQuestions,
		state: solvingInfo ? solvingInfo.data().state : RiddleStatus.Untouched,
		solvedQuestions,
		sharingInformation: newSharingInfo
	};
};

export const fetchRiddleUpsert = async (
	linkId: string
): Promise<RiddleUpsertDetail | null> => {
	const riddleRes = await fetchRiddle(linkId);
	if (!riddleRes) {
		return null;
	}

	const {
		name,
		creatorEmail,
		description,
		image,
		language,
		difficultyValue,
		solvedText,
		solvedImage,
		sharingInformation,
		isSequential
	} = riddleRes.data();
	const newSharingInfo: SharingInformationUpsert = {
		visibility: sharingInformation.isPublic ? 'public' : 'private',
		sharedUsers: sharingInformation.sharedUsers
	};

	const riddle: RiddleUpsertDetail = {
		id: riddleRes.id,
		name,
		// Link id is set together with the whole url for display-and-copy (will be cropped on store)
		linkId: `${window.location.href.replace('/edit', '')}`,
		creatorEmail,
		description,
		image,
		language,
		difficultyValue,
		solvedText,
		solvedImage,
		sharingInformation: newSharingInfo,
		questions: [],
		questionOrder: isSequential ? 'sequence' : 'parallel'
	};

	const questionRes = await fetchQuestions(riddleRes.id);

	questionRes.forEach(doc => {
		const { order, questionText, questionImage, hints, correctAnswers } =
			doc.data();
		const newCorrectAnswers: TextType[] = correctAnswers.map(a => ({
			text: a
		}));

		riddle.questions.push({
			id: doc.id,
			order,
			questionText,
			questionImage,
			hints,
			correctAnswers: newCorrectAnswers
		});
	});
	return riddle;
};
