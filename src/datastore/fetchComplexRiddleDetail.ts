import { getDocs, query, where } from 'firebase/firestore';

import type {
	QuestionDisplayDetail,
	RiddleDisplayDetail,
	SharingInformationUpsert,
	UserAnswer
} from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleStatus } from '../utils/Statuses';
import useLoggedInUser from '../hooks/useLoggedInUser';

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
	const riddleInfo =
		infoRes.docs.length > 0 ? infoRes.docs[0].data() : undefined;

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
		state: riddleInfo ? riddleInfo.state : RiddleStatus.Untouched,
		solvedQuestions: riddleInfo
			? Object.entries(riddleInfo.questions).filter(([, value]) => value.solved)
					.length
			: 0,
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
		const questionInfo = riddleInfo?.questions[order];

		const readAnswers: UserAnswer[] = questionInfo
			? questionInfo.answers.map(a => ({
					answerText: a,
					username: riddleInfo.userEmail,
					correct: correctAnswers.includes(a)
			  }))
			: [];
		const readHints = hints.map(h => ({
			taken: !!questionInfo && order <= questionInfo?.hintsTaken,
			...h
		}));

		riddle.questions.push({
			order,
			questionText,
			questionImage,
			solved: !!riddleInfo && !!questionInfo && questionInfo.solved,
			available:
				riddle.questionOrder === 'parallel' ||
				order === 0 ||
				(!!riddleInfo && riddleInfo.questions[order - 1]?.solved),
			answers: readAnswers,
			correctAnswers,
			hints: readHints
		});
	});

	return riddle;
};
