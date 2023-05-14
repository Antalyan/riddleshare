import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { UpsertRiddleForm } from '../components/forms/riddleUpsertForm/UpsertRiddleForm';
import { useRiddleUpsert } from '../hooks/useRiddleUpsert';
import useLoggedInUser from '../hooks/useLoggedInUser';

export const UpdateRiddlePage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	const riddle = useRiddleUpsert(id ?? '', user?.email ?? '');

	return riddle ? (
		<UpsertRiddleForm isCreate={false} defaultValues={riddle} />
	) : null;
};
