import { useForm } from 'react-hook-form-mui';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import type { RiddleUpsertDetail } from '../../../utils/Types';
import { getDifficultyObject } from '../../../utils/Difficulty';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { storeRiddle } from '../../../datastore/storingFunctions';
import { storage } from '../../../datastore/firebase';

import { RiddleBasicInformationForm } from './RiddleBasicInformationForm';
import { RiddleQuestionForm } from './RiddleQuestionForm';
import { RiddleShareForm } from './RiddleShareForm';

const steps = ['Basic information', 'Questions', 'Sharing options'];

export const CreateRiddleForm = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const formContext = useForm<RiddleUpsertDetail>({
		defaultValues: {
			linkId: uuidv4(),
			language: 'uk',
			difficulty: getDifficultyObject(3),
			questions: [
				{
					hints: [],
					correctAnswers: [{}]
				}
			],
			questionOrder: 'sequence',
			sharingInformation: { visibility: 'public' }
		}
	});

	const user = useLoggedInUser();

	const uploadAllImages = useCallback(async (data: RiddleUpsertDetail) => {
		// Riddle image
		if (data.imageFile) {
			const imageRef = ref(storage, `images/${data.imageFile.name + uuidv4()}`);
			const url = await uploadBytes(imageRef, data.imageFile)
				.then(snapshot => snapshot.metadata.fullPath)
				.then(() => getDownloadURL(imageRef));
			data.image = url;
			delete data.imageFile;
		}

		// Solved image
		if (data.solvedImageFile) {
			const solvedImageRef = ref(
				storage,
				`images/${data.solvedImageFile.name + uuidv4()}`
			);
			const url = await uploadBytes(solvedImageRef, data.solvedImageFile)
				.then(snapshot => snapshot.metadata.fullPath)
				.then(() => getDownloadURL(solvedImageRef));
			data.solvedImage = url;
			delete data.solvedImageFile;
		}

		// Questions images
		// TODO?

		return data;
	}, []);

	const onSubmitFinal = useCallback(
		async (data: RiddleUpsertDetail) => {
			try {
				console.log('before images upload', data);
				data = await uploadAllImages(data);
				console.log('after images upload', data);
				await storeRiddle(data, user);
				console.log('Riddle added successfully');
				navigate('/');
			} catch (error) {
				console.error('Error on adding riddles: ', error);
				//TODO: show error to user
			}
		},
		[formContext]
	);

	const navigate = useNavigate();

	const onCancel = useCallback(() => {
		navigate('/');
	}, []);

	const [riddleName, setRiddleName] = useState<string | null>(null);

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
			riddleName={riddleName}
			handleNext={handleNext}
			handleBack={handleBack}
			onCancel={onCancel}
		/>
	);

	const thirdStep = (
		<RiddleShareForm
			formContext={formContext}
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

			<br />

			{activeStep === 0 && firstStep}
			{activeStep === 1 && secondStep}
			{activeStep === 2 && thirdStep}
		</Box>
	);
};
