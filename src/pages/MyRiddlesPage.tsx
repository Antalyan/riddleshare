import type { FC } from 'react';

import { MockRiddlesPreviews } from '../../mock-data/MockRiddles.ts';
import { RiddleCard } from '../components/RiddleCard';

export const MyRiddlesPage: FC = () => (
	<>
		{MockRiddlesPreviews.map(riddle => (
			<RiddleCard key={riddle.id} {...riddle} />
		))}
	</>
);
