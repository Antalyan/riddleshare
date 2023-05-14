import { Box, Button, Stack } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form-mui';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import type { Dispatch, FC, SetStateAction } from 'react';
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

export const RiddleBasicInformationForm: FC<Props> = ({
	formContext,
	setRiddleName,
	handleNext,
	onCancel
}) => {
	const { control } = formContext;
	return (
		<FormContainer formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<TextFieldElement
					name="name"
					label="Riddle name"
					// required
					onChange={e => setRiddleName(e.target.value)}
				/>
				<TextFieldElement
					label="Description"
					multiline
					name="description"
					rows={5}
					// required
				/>
				<FileUploader
					name="imageFile"
					control={control}
					label="Riddle preview picture"
				/>
				<AutocompleteLanguages
					control={control}
					label="Language"
					name="language"
				/>
				<AutocompleteDifficulties
					control={control}
					label="Expected difficulty"
					name="difficultyValue"
				/>
				<TextFieldElement
					label="Riddle solved text"
					multiline
					name="solvedText"
					rows={5}
					// required
					placeholder="Text displayed to the user when the riddle is solved"
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
