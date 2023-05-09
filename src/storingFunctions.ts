import { doc, Timestamp, writeBatch } from 'firebase/firestore';
import type { User } from 'firebase/auth';

import {
	db,
	questionsCollection,
	riddlesCollection
} from './datastore/firebase';
import type { RiddleUpsertDetail } from './utils/Types';

export const storeRiddle = async (
	data: RiddleUpsertDetail,
	user: User | undefined
) => {
	if (!user) {
		throw new Error('User not authenticated!');
	}

	const batch = writeBatch(db);

	const { questions, questionOrder, sharingInformation, difficulty, ...rest } =
		data;
	const riddleDoc = doc(riddlesCollection);
	batch.set(riddleDoc, {
		...rest,
		difficultyValue: difficulty.value,
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
			order: index,
			hintText: h.hintText
		}));
		const updatedCorrectAnswers = correctAnswers.map(a => a.text);
		batch.set(doc(questionCollection), {
			...rest,
			order: index,
			hints: updatedHints,
			correctAnswers: updatedCorrectAnswers
		});
	});

	await batch.commit();
};
