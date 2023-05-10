import { useEffect, useState } from 'react';
import type { QueryConstraint } from 'firebase/firestore';

import type { RiddlePreview } from '../utils/Types';
import { fetchRiddlePreviews } from '../datastore/fetchingFunctions';

//TODO: add filtering and paging

export const useRiddlePreview = (...queryConstraints: QueryConstraint[]) => {
	const [riddles, setRiddles] = useState<RiddlePreview[]>([]);
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddlePreviews = await fetchRiddlePreviews(...queryConstraints);
				setRiddles(riddlePreviews);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);
	return riddles;
};
