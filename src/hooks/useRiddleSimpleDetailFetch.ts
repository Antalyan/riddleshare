import { useEffect, useState } from 'react';

import { fetchRiddleSimpleDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { testRiddleExistenceAndPermissions } from '../utils/testRiddleExistenceAndPermissions';

export const useRiddleSimpleDetailFetch = (
	linkId: string,
	userEmail: string
) => {
	const [riddleData, setRiddleData] = useState<RiddleDisplayDetailSimple>();

	useEffect(() => {
		const fetchRiddle = async () => {
			try {
				const riddle = await fetchRiddleSimpleDetail(linkId, userEmail);

				testRiddleExistenceAndPermissions(riddle, userEmail);
				setRiddleData(riddle);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRiddle();
	}, []);

	return riddleData;
};
