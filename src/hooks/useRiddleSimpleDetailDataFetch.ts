import { useEffect, useState } from 'react';
import { onSnapshot, query, where } from 'firebase/firestore';

import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleStatus } from '../utils/Statuses';
import {
	riddlesCollection,
	userRiddleInfoCollection
} from '../datastore/firebase';

import useLoggedInUser from './useLoggedInUser';

//TODO Optional: replace with one-time fetch?

export const useRiddleSimpleDetailDataFetch = (
	linkId: string
): RiddleDisplayDetailSimple => {
	const user = useLoggedInUser();

	const [riddle, setRiddle] = useState<RiddleDisplayDetailSimple>({
		name: '',
		description: '',
		language: 'uk',
		difficulty: getDifficultyObject(1),
		linkId,
		sharingInformation: { visibility: 'public' },
		numberOfQuestions: -1,
		solvedQuestions: -1,
		state: RiddleStatus.Untouched
	});

	const qRiddle = query(riddlesCollection, where('linkId', '==', linkId));
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', linkId),
		where('userEmail', '==', user?.email)
	);

	useEffect(
		() =>
			onSnapshot(qRiddle, snapshot => {
				const riddleDoc = snapshot.docs[0];
				const {
					name,
					description,
					image,
					language,
					difficultyValue,
					numberOfQuestions
				} = riddleDoc.data();
				setRiddle(prevState => ({
					...prevState,
					name,
					description,
					image,
					language,
					difficulty: getDifficultyObject(difficultyValue),
					numberOfQuestions
				}));
			}),
		[]
	);

	useEffect(
		() =>
			onSnapshot(qSolveInfo, snapshot => {
				if (snapshot.docs.length === 0) {
					setRiddle(prevState => ({
						...prevState,
						state: RiddleStatus.Untouched,
						solvedQuestions: 0
					}));
					return;
				}
				const infoDoc = snapshot.docs[0];
				const { state, questions } = infoDoc.data();
				const solvedQuestions = Object.entries(questions).filter(
					([, value]) => value.solved
				).length;
				setRiddle(prevState => ({
					...prevState,
					state,
					solvedQuestions
				}));
			}),
		[]
	);

	return riddle;
};
