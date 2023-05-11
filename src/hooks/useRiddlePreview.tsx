import { useEffect, useState } from 'react';
import type { QueryConstraint } from 'firebase/firestore';

import type { RiddlePreview } from '../utils/Types';
import { fetchRiddlePreviews } from '../datastore/fetchingFunctions';
import { fetchUserRiddleInfo } from '../datastore/fetchingQueries';

import useLoggedInUser from './useLoggedInUser';

//TODO: add filtering and paging

export const useRiddlePreview = (...queryConstraints: QueryConstraint[]) => {
	const [riddles, setRiddles] = useState<RiddlePreview[]>([]);
	const user = useLoggedInUser();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddlePreviews = await fetchRiddlePreviews(
					user,
					...queryConstraints
				);
				setRiddles(riddlePreviews);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);
	return riddles;
};
