import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { RiddleUpsertDetail } from '../utils/Types';
import { fetchRiddleUpsert } from '../datastore/fetchingFunctions';

export const useRiddleUpsert = (linkId: string, userEmail: string) => {
	const navigate = useNavigate();
	const [riddle, setRiddle] = useState<RiddleUpsertDetail | null>(null);

	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddleUpsert = await fetchRiddleUpsert(linkId);

				if (
					// Redirect non-existent riddle and make only creator to edit the riddle
					!riddleUpsert ||
					riddleUpsert.creatorEmail !== userEmail
				) {
					navigate('/not-found');
				}
				setRiddle(riddleUpsert);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);
	return riddle;
};
