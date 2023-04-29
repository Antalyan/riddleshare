import type { FC } from 'react';

import { MockRiddles } from '../../mock-data/MockRiddles.ts';
import { RiddleCard } from '../components/RiddleCard.tsx';

export const MyRiddlesPage: FC = () => (
	<>
		{MockRiddles.map(riddle => (
			<RiddleCard key={riddle.id} {...riddle} />
		))}
	</>
);
