import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchRiddleComplexDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetail } from '../utils/Types';

export const useRiddleComplexDetailFetch = (
	linkId: string,
	userEmail: string
) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [riddle, setRiddle] = useState<RiddleDisplayDetail | null>(null);

	useEffect(() => {
		const fetchRiddle = async () => {
			try {
				const riddleData = await fetchRiddleComplexDetail(linkId, userEmail);

				if (
					// Redirect non-existent riddle and protect private riddle
					!riddleData ||
					(riddleData.sharingInformation.visibility === 'private' &&
						!riddleData.sharingInformation.sharedUsers?.includes(userEmail) &&
						riddleData.creatorEmail !== userEmail)
				) {
					navigate('/not-found');
				}
				setRiddle(riddleData);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchRiddle();
	}, []);

	return { riddle, setRiddle, isLoading };
};
