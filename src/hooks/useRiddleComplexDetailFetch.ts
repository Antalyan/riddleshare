import { useEffect, useState } from 'react';

import { fetchRiddleComplexDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetail } from '../utils/Types';
import { testRiddleExistenceAndPermissions } from '../utils/testRiddleExistenceAndPermissions';

export const useRiddleComplexDetailFetch = (
	linkId: string,
	userEmail: string
) => {
	const [riddleData, setRiddleData] = useState<RiddleDisplayDetail>();

	useEffect(() => {
		const fetchRiddle = async () => {
			try {
				const riddle = await fetchRiddleComplexDetail(linkId, userEmail);

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
