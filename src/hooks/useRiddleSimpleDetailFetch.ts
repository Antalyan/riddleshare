import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchRiddleSimpleDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetailSimple } from '../utils/Types';

export const useRiddleSimpleDetailFetch = (
	linkId: string,
	userEmail: string
) => {
	const navigate = useNavigate();
	const [riddleData, setRiddleData] =
		useState<RiddleDisplayDetailSimple | null>(null);

	useEffect(() => {
		const fetchRiddle = async () => {
			try {
				const riddle = await fetchRiddleSimpleDetail(linkId, userEmail);

				if (
					// Redirect non-existent riddle and protect private riddle
					!riddle ||
					(riddle.sharingInformation.visibility === 'private' &&
						!riddle.sharingInformation.sharedUsers?.includes(userEmail) &&
						riddle.creatorEmail !== userEmail)
				) {
					navigate('/not-found');
				}
				setRiddleData(riddle);
			} catch (error) {
				console.log(error);
			}
		};
		fetchRiddle();
	}, []);

	return riddleData;
};
