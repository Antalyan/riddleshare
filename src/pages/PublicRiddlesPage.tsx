import type { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { where } from 'firebase/firestore';

import { RiddleCard } from '../components/RiddleCard';
import { useRiddlePreview } from '../hooks/useRiddlePreview';
import { LoadingComponent } from '../components/LoadingComponent';

export const PublicRiddlesPage: FC = () => {
	const { riddles, isLoading } = useRiddlePreview(
		where('sharingInformation.isPublic', '==', true)
	);

	if (isLoading) {
		return <LoadingComponent />;
	}

	if (riddles.length === 0) {
		return <Typography variant="h6">No public riddles.</Typography>;
	}

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
