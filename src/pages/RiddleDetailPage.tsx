import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot, query, where } from 'firebase/firestore';

import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { riddlesCollection, userRiddleInfoCollection } from '../firebase';
import { getDifficultyObject } from '../utils/Difficulty';
import { RiddleDetail } from '../components/RiddleDetail';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RiddleStatus } from '../utils/Enums';

//TODO: Add similar page with is creator view = false => (Figma: My riddles - detail)
const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	//TODO: replace the default values and display only after the data are fetched from both queries
	const [riddle, setRiddle] = useState<RiddleDisplayDetailSimple>({
		name: '',
		description: '',
		language: 'uk',
		difficulty: getDifficultyObject(1),
		linkId: id ?? '',
		solvedText: '',
		sharingInformation: { visibility: 'public' },
		numberOfQuestions: -1,
		solvedQuestions: 0,
		state: RiddleStatus.Untouched
	});

	const qRiddle = query(riddlesCollection, where('linkId', '==', id));
	const qSolveInfo = query(
		userRiddleInfoCollection,
		where('riddleLinkId', '==', id),
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
	return <RiddleDetail isCreatorView={false} riddleDetail={riddle} />;
};

export default RiddleDetailPage;
