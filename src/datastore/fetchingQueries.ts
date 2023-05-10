import type { QueryConstraint } from 'firebase/firestore';
import { getDocs, query, where, orderBy } from 'firebase/firestore';

import {
	questionsCollection,
	riddlesCollection,
	userRiddleInfoCollection,
	usersCollection
} from './firebase';

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

export const fetchUserRiddleInfos = async (
	linkIds: string[],
	userEmail: string
) => {
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', 'in', linkIds),
		where('userEmail', '==', userEmail)
	);
	const infoRes = await getDocs(qSolveInfo);
	return infoRes.docs.length > 0 ? infoRes.docs : undefined; //User may not have answered yet, so there is no record
};

//TODO: add paging and filtering to arguments
export const fetchRiddles = async (...queryConstraints: QueryConstraint[]) => {
	const qRiddle = query(riddlesCollection, ...queryConstraints);
	return (await getDocs(qRiddle)).docs;
};
export const fetchRiddle = async (linkId: string) => {
	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	return (await getDocs(qRiddle)).docs[0];
};
export const fetchQuestions = async (riddleDocId: string) => {
	const qQuestions = query(questionsCollection(riddleDocId));
	return await getDocs(qQuestions);
};
export const fetchUsers = async () => {
	const qUsers = query(usersCollection, orderBy('email'));
	return await getDocs(qUsers);
};
