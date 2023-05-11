import { getDocs, deleteDoc, query, where } from 'firebase/firestore';

import { userRiddleInfoCollection, userRiddleInfoDocument } from './firebase';

export const deleteUserRiddleInfo = async (
	linkId: string,
	userEmail: string
) => {
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId),
		where('userEmail', '==', userEmail)
	);
	const infoRes = await getDocs(qSolveInfo);
	await deleteDoc(userRiddleInfoDocument(infoRes.docs[0].id));
};
