import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchRiddleSimpleDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetailSimple } from '../utils/Types';

export const useRiddleSimpleDetailFetch = (
	linkId: string,
	userEmail: string
) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [riddle, setRiddle] = useState<RiddleDisplayDetailSimple | null>(null);

	useEffect(() => {
		const fetchRiddle = async () => {
			try {
				const riddleData = await fetchRiddleSimpleDetail(linkId, userEmail);

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

	return { riddle, isLoading };
};
