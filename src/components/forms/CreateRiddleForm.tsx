import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { AddAlarm } from '@mui/icons-material';

import type { RiddleUpsertDetail } from '../../utils/Types.ts';

import { TextFieldFormComponent } from './TextFieldFormComponent.tsx';
import { AutocompleteFormComponent } from './AutocompleteFormComponent.tsx';

const mockOptions = [
	{
		id: 1,
		label: 'First'
	},
	{
		id: 2,
		label: 'Second'
	},
	{
		id: 3,
		label: 'Third'
	},
	{
		id: 4,
		label: 'Four'
	}
];

export const CreateRiddleForm = () => {
	const formContext = useForm<RiddleUpsertDetail>();
	const onSubmit = useCallback(
		(data: RiddleUpsertDetail) => {
			console.log(data);
		},
		[formContext]
	);
	return (
		<FormContainer onSuccess={onSubmit} formContext={formContext}>
			<Stack gap={0}>
				<TextFieldFormComponent name="lame" label="lame" required />
				<TextFieldFormComponent name="lasme" label="lame" required />
				<AutocompleteFormComponent name="countries" options={mockOptions} />
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</Stack>
		</FormContainer>
	);
};
