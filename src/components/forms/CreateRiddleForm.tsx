import { FormContainer, useForm } from 'react-hook-form-mui';
import { useCallback } from 'react';
import { Button, Stack } from '@mui/material';

import type { RiddleUpsertDetail } from '../../utils/Types';

import { TextFieldFormComponent } from './generic/TextFieldFormComponent';
import { AutocompleteLanguages } from './AutocompleteLanguages';
import { AutocompleteDifficulties } from './AutocompleteDifficulties';
import { AutocompleteUsers } from './AutocompleteUsers';
import { RadioButtonFormComponentBroad } from './generic/RadioButtonFormComponentBroad';

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
			<Stack gap={2}>
				<TextFieldFormComponent name="lame" label="lame" required />
				<TextFieldFormComponent name="lasme" label="lame" required />
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
				<AutocompleteUsers />
				<RadioButtonFormComponentBroad
					options={[
						{ id: '1', label: 'First' },
						{ id: '2', label: 'Second' }
					]}
					name="randomName"
					label="x"
				/>
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</Stack>
		</FormContainer>
	);
};
