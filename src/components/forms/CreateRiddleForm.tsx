import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { AddAlarm } from '@mui/icons-material';

import type { RiddleUpsertDetail } from '../../utils/Types';

import { TextFieldFormComponent } from './generic/TextFieldFormComponent';
import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent';
import { AutocompleteLanguages } from './AutocompleteLanguages.tsx';
import { AutocompleteDifficulties } from './AutocompleteDifficulties.tsx';
import { AutocompleteUsers } from './AutocompleteUsers.tsx';

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
				<Button type="submit" color="primary" variant="contained">
					Submit
				</Button>
			</Stack>
		</FormContainer>
	);
};
