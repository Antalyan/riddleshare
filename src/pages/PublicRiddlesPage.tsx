import type { FC } from 'react';

import { MockRiddlesPreviews } from '../../mock-data/MockData';
import { RiddleCard } from '../components/RiddleCard';

export const PublicRiddlesPage: FC = () => (
	<>
		{MockRiddlesPreviews.map(riddle => (
			<RiddleCard key={riddle.id} {...riddle} />
		))}
	</>
);

//TODO!
