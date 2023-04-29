import type { FC } from 'react';

import { MockRiddles } from '../../mock-data/MockRiddles';
import { RiddleCard } from '../components/RiddleCard';

export const MyRiddlesPage: FC = () => (
	<>
		{MockRiddles.map(riddle => (
			<RiddleCard key={riddle.id} {...riddle} />
		))}
	</>
);
