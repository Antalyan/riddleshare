import { Box, Button, Stack } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form-mui';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

import { FileUploader } from '../common/FileUploader';
import { AutocompleteLanguages } from '../common/AutocompleteLanguages';
import { AutocompleteDifficulties } from '../common/AutocompleteDifficulties';
import type { RiddleUpsertDetail } from '../../../utils/Types';

type Props = {
	formContext: UseFormReturn<RiddleUpsertDetail>;
	setRiddleName: Dispatch<SetStateAction<string | null>>;
	handleNext: () => void;
	onCancel: () => void;
};

export const RiddleBasicInformationForm = ({
	formContext,
	setRiddleName,
	handleNext,
	onCancel
}: Props) => {
	const { control } = formContext;
	return (
		<FormContainer formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<TextFieldElement
					name="name"
					label="Riddle name"
					required
					onChange={e => setRiddleName(e.target.value)}
				/>
				<TextFieldElement
					name="description"
					label="Description"
					required
					multiline
					rows={5}
					// required
				/>
				<FileUploader
					name="imageFile"
					label="Riddle preview picture"
					control={control}
				/>
				<AutocompleteLanguages
					name="language"
					label="Language"
					control={control}
				/>
				<AutocompleteDifficulties
					name="difficultyValue"
					label="Expected difficulty"
					control={control}
				/>
				<TextFieldElement
					name="solvedText"
					label="Riddle solved text"
					placeholder="Text displayed to the user when the riddle is solved"
					required
					multiline
					rows={5}
					// required
				/>
				<FileUploader
					name="solvedImageFile"
					control={control}
					label="Riddle solution picture"
				/>
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						color="primary"
						variant="contained"
						sx={{ flex: 1 }}
						onClick={handleNext}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);
};
