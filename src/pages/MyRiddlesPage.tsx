import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Stack } from '@mui/material';

import { RiddleCard } from '../components/RiddleCard';
import type { RiddlePreview } from '../utils/Types';
import { riddlesCollection } from '../datastore/firebase';
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
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
