import type { FC } from 'react';
import { where } from 'firebase/firestore';
import { Stack, Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddlePreview } from '../hooks/useRiddlePreview';
import { RiddleCard } from '../components/RiddleCard';
import { LoadingComponent } from '../components/LoadingComponent';

export const ReceivedRiddlesPage: FC = () => {
	const user = useLoggedInUser();
	const { riddles, isLoading } = useRiddlePreview(
		where('sharingInformation.isPublic', '==', false),
		where('sharingInformation.sharedUsers', 'array-contains', user?.email)
	);

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (riddles.length === 0) {
		return <Typography variant="h6">No received riddles.</Typography>;
	}

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
