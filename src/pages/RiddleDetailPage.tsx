import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { RiddleDetail } from '../components/RiddleDetail';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useRiddleSimpleDetailFetch } from '../hooks/useRiddleSimpleDetailFetch';
import { LoadingComponent } from '../components/LoadingComponent';

const RiddleDetailPage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	const { riddle, isLoading } = useRiddleSimpleDetailFetch(
		id ?? '',
		user?.email ?? ''
	);

	if (isLoading) {
		return <LoadingComponent />;
	}

	return riddle ? (
		<RiddleDetail
			isCreatorView={riddle.creatorEmail === user?.email}
			riddleDetail={riddle}
		/>
	) : null;
};

export default RiddleDetailPage;
