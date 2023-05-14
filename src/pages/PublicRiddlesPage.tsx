import type { FC } from 'react';
import { Stack } from '@mui/material';
import { where } from 'firebase/firestore';

import { RiddleCard } from '../components/RiddleCard';
import { useRiddlePreview } from '../hooks/useRiddlePreview';

export const PublicRiddlesPage: FC = () => {
	const riddles = useRiddlePreview(
		where('sharingInformation.isPublic', '==', true)
	);

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
		</Stack>
	);
};
