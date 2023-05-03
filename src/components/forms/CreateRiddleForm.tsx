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
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<TextFieldFormComponent name="name" label="Riddle name" required />
				<TextFieldFormComponent
					label="Description"
					multiline
					name="description"
					rows={5}
					required
				/>
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
				<AutocompleteUsers />
				<RadioButtonFormComponentBroad
					options={[
						{ id: '1', label: 'Sequential' },
						{ id: '2', label: 'Parallel' }
					]}
					name="randomName"
					label="Questions flow"
				/>
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</Stack>
		</FormContainer>
	);
};
