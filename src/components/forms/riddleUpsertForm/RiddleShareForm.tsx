import { Box, Button, Stack, Typography } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form-mui';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import type { FC } from 'react';
import React from 'react';

import type { RiddleUpsertDetail } from '../../../utils/Types';
import { RadioButtonFormComponentBroad } from '../common/RadioButtonFormComponentBroad';
import { CopyContentButton } from '../common/CopyContentButton';
import { AutocompleteUsers } from '../common/AutocompleteUsers';

type Props = {
	formContext: UseFormReturn<RiddleUpsertDetail>;
	isCreate: boolean;
	riddleName: string | null;
	onSubmitFinal: (data: RiddleUpsertDetail) => void;
	handleBack: () => void;
	onCancel: () => void;
};

export const RiddleShareForm: FC<Props> = ({
	formContext,
	isCreate,
	riddleName,
	onSubmitFinal,
	handleBack,
	onCancel
}) => {
	const { watch, control } = formContext;
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
						InputProps={{
							endAdornment: <CopyContentButton content={watchLink} />,
							readOnly: true
						}}
					/>
				) : (
					<AutocompleteUsers
						label="Users to share with"
						name="sharingInformation.sharedUsers"
						control={control}
					/>
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
						{isCreate ? 'Create' : 'Update'}
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);
};
