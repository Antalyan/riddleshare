import type { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { UpsertRiddleForm } from '../components/forms/riddleUpsertForm/UpsertRiddleForm';
import { useRiddleUpsert } from '../hooks/useRiddleUpsert';

export const UpdateRiddlePage: FC = () => {
	const { id } = useParams();

	const riddle = useRiddleUpsert(id ?? '');
	if (riddle === null) {
		return <Navigate to="/notfound" replace />;
	}
	return riddle ? (
		<UpsertRiddleForm isCreate={false} defaultValues={riddle} />
	) : (
		<></>
	);
};
