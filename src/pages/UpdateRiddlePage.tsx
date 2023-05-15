import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { UpsertRiddleForm } from '../components/forms/riddleUpsertForm/UpsertRiddleForm';
import { useRiddleUpsert } from '../hooks/useRiddleUpsert';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { LoadingComponent } from '../components/LoadingComponent';

export const UpdateRiddlePage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	const { riddle, isLoading } = useRiddleUpsert(id ?? '', user?.email ?? '');

	if (isLoading) {
		return <LoadingComponent />;
	}

	return riddle ? (
		<UpsertRiddleForm isCreate={false} defaultValues={riddle} />
	) : null;
};
