import type { FC } from 'react';
import { where } from 'firebase/firestore';
import { Stack } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddlePreview } from '../hooks/useRiddlePreview';
import { RiddleCard } from '../components/RiddleCard';

export const ReceivedRiddlesPage: FC = () => {
	const user = useLoggedInUser();
	const riddles = useRiddlePreview(
		where('sharingInformation.isPublic', '==', false),
		where('sharingInformation.sharedUsers', 'array-contains', user?.email)
	);

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
