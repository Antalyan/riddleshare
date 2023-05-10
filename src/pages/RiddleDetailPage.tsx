import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RiddleDetail } from '../components/RiddleDetail';
import { useRiddleSimpleDetailDataFetch } from '../hooks/useRiddleSimpleDetailDataFetch';

//TODO: Add similar page with is creator view = false => (Figma: My riddles - detail)
const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const riddle = useRiddleSimpleDetailDataFetch(id ?? '');
	return riddle.name !== '' && riddle.solvedQuestions !== -1 ? ( //This condition prevents too early display
		<RiddleDetail isCreatorView={false} riddleDetail={riddle} />
	) : (
		<></>
	);
};

export default RiddleDetailPage;
