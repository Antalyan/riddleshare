import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RiddleDetail } from '../components/RiddleDetail';
import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { fetchRiddleSimpleDetail } from '../datastore/fetchingFunctions';
import useLoggedInUser from '../hooks/useLoggedInUser';

const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useLoggedInUser();

	const [riddleData, setRiddleData] = useState<RiddleDisplayDetailSimple>();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddle = await fetchRiddleSimpleDetail(id ?? '', user!);

				if (
					// Redirect non-existent riddle and protect private riddle
					!riddle ||
					(riddle.sharingInformation.visibility === 'private' &&
						!riddle.sharingInformation.sharedUsers?.includes(
							user?.email ?? ''
						) &&
						riddle.creatorEmail !== (user?.email ?? ''))
				) {
					navigate('/not-found');
				}
				setRiddleData(riddle);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);

	return riddleData !== undefined ? (
		<RiddleDetail
			isCreatorView={riddleData.creatorEmail === user?.email}
			riddleDetail={riddleData}
		/>
	) : null;
};

export default RiddleDetailPage;
