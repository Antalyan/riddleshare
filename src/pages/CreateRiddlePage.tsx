import type { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { UpsertRiddleForm } from '../components/forms/riddleUpsertForm/UpsertRiddleForm';

export const CreateRiddlePage: FC = () => (
	<UpsertRiddleForm
		isCreate
		defaultValues={{
			// Link id is set together with the whole url for display-and-copy (will be cropped on store)
			linkId: `${window.location.href.replace(
				'create-riddle',
				''
			)}riddle-detail/${uuidv4()}`,
			name: '',
			description: '',
			creatorEmail: '',
			language: 'uk',
			difficultyValue: 3,
			questions: [
				{
					hints: [],
					correctAnswers: [{ text: '' }]
				}
			],
			solvedText: '',
			questionOrder: 'sequence',
			sharingInformation: { visibility: 'public' }
		}}
	/>
);
