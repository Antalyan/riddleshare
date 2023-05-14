import { deleteDoc } from 'firebase/firestore';

import {
	questionsDocument,
	riddlesDocument,
	userRiddleInfoDocument
} from './firebase';
import {
	fetchQuestions,
	fetchRiddle,
	fetchRiddleSolvers,
	fetchUserRiddleInfo
} from './fetchingQueries';

export const deleteUserRiddleInfo = async (
	linkId: string,
	userEmail: string
) => {
	const infoRes = await fetchUserRiddleInfo(linkId, userEmail);
	if (infoRes) {
		await deleteDoc(userRiddleInfoDocument(infoRes.id));
	} else {
		console.log('There was no record to delete.');
	}
};

// Warning: This solution does not scale well with a lot of data
export const deleteRiddle = async (linkId: string) => {
	const riddle = await fetchRiddle(linkId);
	if (!riddle) {
		console.log('Riddle does not exist.');
		return;
	}

	const questions = await fetchQuestions(riddle.id);
	questions.map(async q => await deleteDoc(questionsDocument(riddle.id, q.id)));
	console.log('Questions deleted.');

	await deleteDoc(riddlesDocument(riddle.id));
	console.log('Riddle deleted.');

	const infoRes = await fetchRiddleSolvers(linkId);
	if (infoRes) {
		infoRes.map(async i => await deleteDoc(userRiddleInfoDocument(i.id)));
	}
	console.log('Answers deleted.');
};
