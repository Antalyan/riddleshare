import { useEffect, useState } from 'react';

import type { RiddleUpsertDetail } from '../utils/Types';
import { fetchRiddleUpsert } from '../datastore/fetchingFunctions';

export const useRiddleUpsert = (linkId: string) => {
	const [riddle, setRiddle] = useState<RiddleUpsertDetail | null>();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddleUpsert = await fetchRiddleUpsert(linkId);
				setRiddle(riddleUpsert);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);
	return riddle;
};
