import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RiddleDetail } from '../components/RiddleDetail';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddleSimpleDetailFetch } from '../hooks/useRiddleSimpleDetailFetch';

const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	const riddle = useRiddleSimpleDetailFetch(id ?? '', user?.email ?? '');

	return riddle ? (
		<RiddleDetail
			isCreatorView={riddle.creatorEmail === user?.email}
			riddleDetail={riddle}
		/>
	) : null;
};

export default RiddleDetailPage;
