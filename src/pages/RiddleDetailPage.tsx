import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RiddleDetail } from '../components/RiddleDetail';
import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { fetchRiddleSimpleDetail } from '../datastore/fetchingFunctions';
import useLoggedInUser from '../hooks/useLoggedInUser';

//TODO: Add similar page with is creator view = false => (Figma: My riddles - detail)
const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	const [riddleData, setRiddleData] = useState<RiddleDisplayDetailSimple>();
	useEffect(() => {
		const loadAndSetRiddle = async () => {
			try {
				const riddle = await fetchRiddleSimpleDetail(id ?? '', user!);
				setRiddleData(riddle);
			} catch (error) {
				console.log(error);
			}
		};
		loadAndSetRiddle();
	}, []);

	return riddleData !== undefined ? (
		<RiddleDetail isCreatorView={false} riddleDetail={riddleData} />
	) : (
		<></>
	);
};

export default RiddleDetailPage;
