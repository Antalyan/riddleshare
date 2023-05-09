import { useEffect } from 'react';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';

import type {
	RiddleDisplayDetail,
	SharingInformationUpsert
} from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleStatus } from '../utils/Statuses';
import useLoggedInUser from '../hooks/useLoggedInUser';
import type { UserRiddleInfoDb } from '../utils/DbTypes';

import {
	questionsCollection,
	riddlesCollection,
	userRiddleInfoCollection
} from './firebase';

// TODO: Extract common parts with simple detail fetch
export const fetchComplexRiddleDetail = async (
	linkId: string
): Promise<RiddleDisplayDetail> => {
	const user = useLoggedInUser();

	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId),
		where('userEmail', '==', user?.email)
	);
	const infoRes = await getDocs(qSolveInfo);
	const riddleInfo: UserRiddleInfoDb = infoRes.docs[0].data();

	/// New
	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	const riddleRes = await getDocs(qRiddle);
	const {
		name,
		description,
		image,
		language,
		difficultyValue,
		numberOfQuestions,
		solvedText,
		solvedImage,
		sharingInformation
	} = riddleRes.docs[0].data();
	const newSharingInfo: SharingInformationUpsert = {
		visibility: sharingInformation.isPublic ? 'public' : 'private',
		sharedUsers: sharingInformation.sharedUsers
	};
	const riddle: RiddleDisplayDetail = {
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
		state: riddleInfo.state,
		solvedQuestions: Object.entries(riddleInfo.questions).filter(
			([, value]) => value.solved
		).length,
		questions: []
	};

	if (!riddle.id) {
		throw Error('Undefined riddle id!');
	}
	const qQuestions = query(
		questionsCollection(riddle.id),
		where('id', '==', riddle.id)
	);
	const questionRes = await getDocs(qQuestions);
	questionRes.docs.forEach(doc => {
		const { order, questionText, questionImage, hints, correctAnswers } =
			doc.data();
		const questionInfo = riddleInfo.questions[order]; //TODO: can be undefined

		riddle.questions.push({
			order,
			questionText,
			questionImage,
			correctAnswers,

			//Todo: to be updated later
			hints: [],
			answers: [],
			solved: false,
			available: false
		});
	});

	return riddle;
};
