import { FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { RiddleUpsertDetail } from '../../utils/Types';
import { RiddleStatus } from '../../utils/Enums.ts';
import { CountryCode } from '../../utils/CountryCodes.ts';
import { Difficulty } from '../../utils/Difficulty.ts';

import { AutocompleteLanguages } from './AutocompleteLanguages';
import { AutocompleteDifficulties } from './AutocompleteDifficulties';
import { AutocompleteUsers } from './AutocompleteUsers';
import { RadioButtonFormComponentBroad } from './generic/RadioButtonFormComponentBroad';
import { useFileUploader } from './FileUploader.tsx';

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
			name: '',
			image: '',
			countryCode: 'uk',
			difficulty: { name: 'Moderate', value: 3, color: '#ffff00' }
		}
	});
	const onSubmitIntermediate = useCallback(
		(data: RiddleUpsertDetail) => {
			console.log(data);
			handleNext();
		},
		[formContext]
	);

	const onSubmitFinal = useCallback(
		(data: RiddleUpsertDetail) => {
			console.log(data);
			//TODO: store to db
		},
		[formContext]
	);

	//TODO: make the file loader work on submit
	const previewImageLoader = useFileUploader('image', 'Riddle preview picture');
	const solvedImageLoader = useFileUploader(
		'solvedImage',
		'Riddle solution picture'
	);

	const [riddleName, setRiddleName] = useState<string | null>(null);

	const firstStep = (
		<FormContainer onSuccess={onSubmitIntermediate} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<TextFieldElement
					name="name"
					label="Riddle name"
					required
					onChange={e => setRiddleName(e.target.value)}
				/>
				<TextFieldElement
					label="Description"
					multiline
					name="description"
					rows={5}
					required
				/>
				{previewImageLoader}
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
				<TextFieldElement
					label="Riddle solved text"
					multiline
					name="solvedText"
					rows={5}
					required
					placeholder="Text displayed to the user when the riddle is solved"
				/>
				{solvedImageLoader}
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						color="primary"
						variant="contained"
						sx={{ flex: 1 }}
						onClick={() => onSubmitIntermediate}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);

	const secondStep = (
		<FormContainer onSuccess={onSubmitIntermediate} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<Typography variant="h2">{riddleName}</Typography>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						Question 1
					</AccordionSummary>
					<AccordionDetails>Here goes a question form.</AccordionDetails>
				</Accordion>
				<RadioButtonFormComponentBroad
					options={[
						{ id: '1', label: 'Sequential' },
						{ id: '2', label: 'Parallel' }
					]}
					name="randomName"
					label="Questions flow"
				/>
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
					>
						Cancel
					</Button>
					<Button
						type="submit"
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
						onClick={() => onSubmitIntermediate}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);

	const thirdStep = (
		<FormContainer onSuccess={onSubmitFinal} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<RadioButtonFormComponentBroad
					options={[
						{ id: '1', label: 'Public' },
						{ id: '2', label: 'Private' }
					]}
					name="availability"
					label="Availability"
				/>
				<AutocompleteUsers />
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
					>
						Cancel
					</Button>
					<Button
						type="submit"
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
