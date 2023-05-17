import { useEffect, useState } from 'react';
import type { QueryConstraint } from 'firebase/firestore';

import type { RiddlePreview } from '../utils/Types';
import { fetchRiddlePreviews } from '../datastore/fetchingFunctions';

import useLoggedInUser from './useLoggedInUser';

export const useRiddlePreview = (...queryConstraints: QueryConstraint[]) => {
	const [isLoading, setIsLoading] = useState(true);
	const [riddles, setRiddles] = useState<RiddlePreview[]>([]);
	const user = useLoggedInUser();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddlePreviews = await fetchRiddlePreviews(
					user?.email ?? undefined,
					...queryConstraints
				);
				setRiddles(riddlePreviews);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		loadAndSetRiddle();
	}, []);
	return { riddles, isLoading };
};
