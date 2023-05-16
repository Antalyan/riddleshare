import { useForm } from 'react-hook-form-mui';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { RiddleUpsertDetail } from '../../../utils/Types';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { storeRiddle } from '../../../datastore/storingFunctions';
import { AlertDialog } from '../../dialogs/AlertDialog';
import { uploadFile } from '../../../utils/FileHandling';

import { RiddleBasicInformationForm } from './RiddleBasicInformationForm';
import { RiddleQuestionForm } from './RiddleQuestionForm';
import { RiddleShareForm } from './RiddleShareForm';

const steps = ['Basic information', 'Questions', 'Sharing options'];

type Props = {
	isCreate: boolean;
	defaultValues: RiddleUpsertDetail;
};

export const UpsertRiddleForm: FC<Props> = ({ isCreate, defaultValues }) => {
	const [activeStep, setActiveStep] = useState(0);
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const user = useLoggedInUser();

	const formContext = useForm<RiddleUpsertDetail>({
		defaultValues
	});

	const uploadAllImages = useCallback(async (data: RiddleUpsertDetail) => {
		// Riddle image
		if (data.imageFile) {
			data.image = await uploadFile(data.imageFile);
			delete data.imageFile;
		}

		// Solved image
		if (data.solvedImageFile) {
			data.solvedImage = await uploadFile(data.solvedImageFile);
			delete data.solvedImageFile;
		}

		// Questions images
		// May be implemented in the future

		return data;
	}, []);

	const onSubmitFinal = useCallback(
		async (data: RiddleUpsertDetail) => {
			try {
				console.log('before images upload', data);
				data = await uploadAllImages(data);
				console.log('after images upload', data);

				// Crop url out
				data.linkId = data.linkId.split('/').slice(-1)[0];

				await storeRiddle(data, user);
				console.log('Riddle stored successfully');
				setSubmitSuccessful(true);
				setDialogOpen(true);
			} catch (error) {
				console.error('Error on adding riddles: ', error);
				setSubmitSuccessful(false);
				setDialogOpen(true);
			}
		},
		[formContext]
	);

	const navigate = useNavigate();

	const onCancel = useCallback(() => {
		navigate('/');
	}, []);

	const [riddleName, setRiddleName] = useState<string | null>(null);

	const [submitSuccessful, setSubmitSuccessful] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleClose = useCallback(() => {
		setDialogOpen(false);
		if (submitSuccessful) {
			navigate('/');
		}
	}, [submitSuccessful]);

	const firstStep = (
		<RiddleBasicInformationForm
			formContext={formContext}
			setRiddleName={setRiddleName}
			handleNext={handleNext}
			onCancel={onCancel}
		/>
	);

	const secondStep = (
		<RiddleQuestionForm
			formContext={formContext}
			isCreate={isCreate}
			riddleName={riddleName}
			handleNext={handleNext}
			handleBack={handleBack}
			onCancel={onCancel}
		/>
	);

	const thirdStep = (
		<RiddleShareForm
			formContext={formContext}
			isCreate={isCreate}
			handleBack={handleBack}
			onCancel={onCancel}
			onSubmitFinal={onSubmitFinal}
			riddleName={riddleName}
		/>
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Stepper activeStep={activeStep}>
				{steps.map(label => {
					const stepProps: { completed?: boolean } = {};
					const labelProps: {
						optional?: ReactNode;
					} = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<AlertDialog
				name={submitSuccessful ? 'Congratulations' : 'Error on saving riddle'}
				content={
					submitSuccessful
						? 'Your riddle has been successfully stored!'
						: 'The error could not be stored. Try to repeat the operation later!'
				}
				open={dialogOpen}
				handleClose={handleClose}
			/>

			<br />

			{activeStep === 0 && firstStep}
			{activeStep === 1 && secondStep}
			{activeStep === 2 && thirdStep}
		</Box>
	);
};
