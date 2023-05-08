import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { MockRiddlesPreviews } from '../../mock-data/MockData';
import { RiddleCard } from '../components/RiddleCard';
import type { RiddlePreview } from '../utils/Types';
import { riddlesCollection } from '../firebase';
import { getDifficultyObject } from '../utils/Difficulty';

export const MyRiddlesPage: FC = () => {
	//TODO: add filtering and paging
	const [riddles, setRiddles] = useState<RiddlePreview[]>([]);

	useEffect(
		() =>
			onSnapshot(riddlesCollection, snapshot => {
				const riddleDbData = snapshot.docs.map(doc => doc.data());
				const riddlePreviewData: RiddlePreview[] = riddleDbData.map(riddle => {
					const { linkId, name, image, language, difficultyValue } = riddle;
					return {
						linkId,
						name,
						image,
						language,
						difficulty: getDifficultyObject(difficultyValue)
					};
				});
				setRiddles(riddlePreviewData);
			}),
		[]
	);

	return (
		<>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.id} {...riddle} />
			))}
		</>
	);
};
