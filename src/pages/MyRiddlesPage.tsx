import type { FC } from 'react';
import { where } from 'firebase/firestore';
import { Stack, Typography } from '@mui/material';

import { RiddleCard } from '../components/RiddleCard';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddlePreview } from '../hooks/useRiddlePreview';
import { LoadingComponent } from '../components/LoadingComponent';

export const MyRiddlesPage: FC = () => {
	const user = useLoggedInUser();
	const { riddles, isLoading } = useRiddlePreview(
		where('creatorEmail', '==', user?.email)
	);

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (riddles.length === 0) {
		return <Typography variant="h6">No created riddles.</Typography>;
	}

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
