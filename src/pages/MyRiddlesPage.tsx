import type { FC } from 'react';
import { where } from 'firebase/firestore';
import { Stack } from '@mui/material';

import { RiddleCard } from '../components/RiddleCard';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddlePreview } from '../hooks/useRiddlePreview';

export const MyRiddlesPage: FC = () => {
	const user = useLoggedInUser();
	const riddles = useRiddlePreview(where('creatorEmail', '==', user?.email));

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
