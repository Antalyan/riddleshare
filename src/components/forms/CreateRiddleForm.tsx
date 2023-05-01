import { FormContainer, useForm } from 'react-hook-form-mui';
import { useCallback } from 'react';
import { Button, Stack } from '@mui/material';

import type { RiddleUpsertDetail } from '../../utils/Types';

import { TextFieldFormComponent } from './generic/TextFieldFormComponent';
import { AutocompleteLanguages } from './AutocompleteLanguages.tsx';
import { AutocompleteDifficulties } from './AutocompleteDifficulties.tsx';
import { AutocompleteUsers } from './AutocompleteUsers.tsx';
import { RadioButtonFormComponent } from './generic/RadioButtonFormComponent.tsx';

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
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
				<AutocompleteUsers />
				<RadioButtonFormComponent
					options={[
						{ id: '1', label: 'First' },
						{ id: '2', label: 'Second' }
					]}
					name="randomName"
				/>
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</Stack>
		</FormContainer>
	);
};
