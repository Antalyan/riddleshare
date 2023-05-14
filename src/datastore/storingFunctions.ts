import {
	doc,
	setDoc,
	Timestamp,
	updateDoc,
	writeBatch
} from 'firebase/firestore';
import type { User } from 'firebase/auth';

import type { RiddleDisplayDetail, RiddleUpsertDetail } from '../utils/Types';

import {
	db,
	questionsCollection,
	questionsDocument,
	riddlesCollection,
	riddlesDocument,
	userRiddleInfoCollection,
	userRiddleInfoDocument
} from './firebase';
import { fetchUserRiddleInfo } from './fetchingQueries';

export const storeRiddle = async (
	data: RiddleUpsertDetail,
	user: User | undefined
) => {
	if (!user) {
		throw new Error('User not authenticated!');
	}

	const batch = writeBatch(db);

	const {
		questions,
		questionOrder,
		sharingInformation,
		difficultyValue,
		...rest
	} = data;
	const riddleDoc = data.id ? riddlesDocument(data.id) : doc(riddlesCollection);
	batch.set(riddleDoc, {
		...rest,
		difficultyValue,
		isSequential: questionOrder === 'sequence',
		sharingInformation: {
			isPublic: sharingInformation.visibility === 'public',
			sharedUsers: sharingInformation.sharedUsers
		},
		creatorEmail: user.email ?? '',
		createTime: Timestamp.now(),
		numberOfQuestions: questions.length
	});

	const questionCollection = questionsCollection(riddleDoc.id);
	questions.forEach((question, index) => {
		const { hints, correctAnswers, ...rest } = question;
		const updatedHints = hints.map((h, index) => ({
			order: index + 1,
			hintText: h.hintText
		}));
		const updatedCorrectAnswers = correctAnswers.map(a => a.text);
		batch.set(
			question.id
				? questionsDocument(data.id!, question.id)
				: doc(questionCollection),
			{
				...rest,
				order: index + 1,
				hints: updatedHints,
				correctAnswers: updatedCorrectAnswers
			}
		);
	});

	await batch.commit();
};

export const storeRiddleAnswerInfo = async (
	riddleData: RiddleDisplayDetail,
	user: User
) => {
	console.log(`Storing: ${riddleData}`);
	const { linkId } = riddleData;
	const userAnswerDoc = await fetchUserRiddleInfo(linkId, user.email ?? '');
	const questionsForUpdate: Record<
		number, //questionId
		{ solved: boolean; answers: string[]; hintsTaken: number }
	> = {};
	riddleData.questions.forEach((q, index) => {
		questionsForUpdate[q.order ?? index] = {
			solved: q.solved,
			hintsTaken: q.hintsTaken,
			answers: q.answers.map(a => a.answerText)
		};
	});
	const updateData = {
		userEmail: user.email ?? '',
		riddleLinkId: linkId,
		state: riddleData.state,
		questions: questionsForUpdate
	};
	if (!userAnswerDoc) {
		await setDoc(doc(userRiddleInfoCollection), updateData);
	} else {
		await updateDoc(userRiddleInfoDocument(userAnswerDoc.id), updateData);
	}
};
