import { useCallback, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

import { fetchRiddleCount } from '../datastore/fetchingFunctions';

export const ITEMS_PER_PAGE = 1; //TODO: change after testing

export const usePagination = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchLength = async () => {
			const riddleCount = await fetchRiddleCount();
			setTotalPages(Math.ceil(Math.ceil(riddleCount / ITEMS_PER_PAGE)));
		};
		fetchLength();
	}, []);

	const paginationComponent = (
		<Pagination
			variant="outlined"
			shape="rounded"
			size="large"
			count={totalPages}
			page={page}
			onChange={(_, value) => setPage(value)}
		/>
	);

	return { page, paginationComponent };
};
