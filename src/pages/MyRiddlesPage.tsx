import type { FC } from 'react';
import { limit, orderBy, startAt, where } from 'firebase/firestore';
import { Stack } from '@mui/material';

import { RiddleCard } from '../components/RiddleCard';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddlePreview } from '../hooks/useRiddlePreview';
import { ITEMS_PER_PAGE, usePagination } from '../hooks/usePagination';

export const MyRiddlesPage: FC = () => {
	const user = useLoggedInUser();
	const { page, paginationComponent } = usePagination();
	const riddles = useRiddlePreview(
		where('creatorEmail', '==', user?.email),
		//Here should be used :page value but it cannot since .offset would just read all
		orderBy('createTime', 'desc'),
		limit(ITEMS_PER_PAGE)
	);

	return (
		<Stack gap={2}>
			{riddles.map(riddle => (
				<RiddleCard key={riddle.linkId} {...riddle} />
			))}
			{riddles.length > 0 && paginationComponent}
		</Stack>
	);
};
