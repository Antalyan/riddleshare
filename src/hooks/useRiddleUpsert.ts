import { useEffect, useState } from 'react';
import type { QueryConstraint } from 'firebase/firestore';

import type { RiddlePreview, RiddleUpsertDetail } from '../utils/Types';
import {
	fetchRiddlePreviews,
	fetchRiddleUpsert
} from '../datastore/fetchingFunctions';

import useLoggedInUser from './useLoggedInUser';

export const useRiddleUpsert = (linkId: string) => {
	const [riddle, setRiddle] = useState<RiddleUpsertDetail>();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddleUpsert = await fetchRiddleUpsert(linkId);
				setRiddle(riddleUpsert);
			} catch (error) {
				console.log(error);
			}
		};
		setRiddle(riddle);
	}, []);
	return riddle;
};
