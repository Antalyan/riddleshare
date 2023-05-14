import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { UpsertRiddleForm } from '../components/forms/riddleUpsertForm/UpsertRiddleForm';

export const CreateRiddlePage: FC = () => {
	const { id } = useParams();
	return <UpsertRiddleForm linkId={id} />;
};
