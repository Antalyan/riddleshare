import { useForm } from 'react-hook-form-mui';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import type { RiddleUpsertDetail } from '../../../utils/Types';
import { getDifficultyObject } from '../../../utils/Difficulty';

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

	const onSubmitFinal = useCallback(
		(data: RiddleUpsertDetail) => {
			console.log(data);
			//TODO: store to db
			//TODO: show success
			// navigate('/');
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
