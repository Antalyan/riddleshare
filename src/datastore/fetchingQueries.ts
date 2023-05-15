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
	return infoRes.docs.length > 0 ? infoRes.docs[0] : null; //User may not have answered yet, so there is no record
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
	return (await getDocs(qSolveInfo)).docs;
};

export const fetchRiddleSolvers = async (linkId: string) => {
	const qSolvers = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId)
	);
	return (await getDocs(qSolvers)).docs;
};

//TODO: add paging and filtering to arguments
export const fetchRiddles = async (...queryConstraints: QueryConstraint[]) => {
	const qRiddle = query(riddlesCollection, ...queryConstraints);
	return (await getDocs(qRiddle)).docs;
};
export const fetchRiddle = async (linkId: string) => {
	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	const res = await getDocs(qRiddle);
	return res.docs.length > 0 ? res.docs[0] : null;
};
export const fetchQuestions = async (riddleDocId: string) => {
	const qQuestions = query(questionsCollection(riddleDocId), orderBy('order'));
	return (await getDocs(qQuestions)).docs;
};
export const fetchUsers = async () => {
	const qUsers = query(usersCollection, orderBy('email'));
	return (await getDocs(qUsers)).docs;
};
export const fetchUser = async (userEmail: string) => {
	const qUsers = query(usersCollection, where('email', '==', userEmail));
	const res = await getDocs(qUsers);
	return res.docs.length > 0 ? res.docs[0] : null;
};
