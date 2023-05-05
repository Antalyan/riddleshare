import { Box, Button, Stack, Typography } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form-mui';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import React from 'react';

import type { RiddleUpsertDetail } from '../../../utils/Types.ts';
import { RadioButtonFormComponentBroad } from '../common/RadioButtonFormComponentBroad.tsx';
import { CopyContentButton } from '../common/CopyContentButton.tsx';
import { AutocompleteUsers } from '../common/AutocompleteUsers.tsx';

type Props = {
	formContext: UseFormReturn<RiddleUpsertDetail>;
	riddleName: string | null;
	onSubmitFinal: (data: RiddleUpsertDetail) => void;
	handleBack: () => void;
	onCancel: () => void;
};

export const RiddleShareForm = ({
	formContext,
	riddleName,
	onSubmitFinal,
	handleBack,
	onCancel
}: Props) => {
	const { watch } = formContext;
	const watchIsPublic = watch('sharingInformation.visibility');
	const watchLink = watch('linkId');

	return (
		<FormContainer onSuccess={onSubmitFinal} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<Typography variant="h2">{riddleName}</Typography>
				<Typography variant="subtitle1">
					The last thing you need to do to finish your riddle is to publish it.
					<br />
					The riddle is{' '}
					<Typography component="span" fontWeight="bold">
						public
					</Typography>{' '}
					by default. If you wish to keep it{' '}
					<Typography component="span" fontWeight="bold">
						private
					</Typography>
					, change the settings below and share the riddle with friends.
				</Typography>
				<RadioButtonFormComponentBroad
					options={[
						{ id: 'public', label: 'Public' },
						{ id: 'private', label: 'Private' }
					]}
					name="sharingInformation.visibility"
					label="Availability"
				/>

				{watchIsPublic === 'public' ? (
					<TextFieldElement
						name="linkId"
						label="Riddle link"
						// required
						InputProps={{
							endAdornment: <CopyContentButton content={watchLink ?? ''} />,
							readOnly: true
						}}
					/>
				) : (
					<AutocompleteUsers />
				)}
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
						onClick={onCancel}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
						onClick={handleBack}
					>
						Back
					</Button>
					<Button
						type="submit"
						color="primary"
						variant="contained"
						sx={{ flex: 1 }}
					>
						Create
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);
};
