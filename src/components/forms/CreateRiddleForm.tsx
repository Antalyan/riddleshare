import {
	FormContainer,
	TextFieldElement,
	useFieldArray,
	useForm
} from 'react-hook-form-mui';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import {
	Box,
	Button,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography
} from '@mui/material';

import type { RiddleUpsertDetail } from '../../utils/Types';
import { QuestionUpsertAccordion } from '../QuestionUpsertAccordion.tsx';

import { AutocompleteLanguages } from './AutocompleteLanguages';
import { AutocompleteDifficulties } from './AutocompleteDifficulties';
import { AutocompleteUsers } from './AutocompleteUsers';
import { RadioButtonFormComponentBroad } from './generic/RadioButtonFormComponentBroad';
import { FileUploader } from './FileUploader.tsx';

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
			difficulty: { name: 'Moderate', value: 3, color: '#ffff00' },
			questions: [
				{
					questionText: '',
					image: '',
					hints: [],
					correctAnswers: [{ text: '' }]
				}
			]
		}
	});

	const { control } = formContext;

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

	const [riddleName, setRiddleName] = useState<string | null>(null);

	const firstStep = (
		<FormContainer onSuccess={onSubmitIntermediate} formContext={formContext}>
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
					name="image"
					control={control}
					label="Riddle preview picture"
				/>
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
				<TextFieldElement
					label="Riddle solved text"
					multiline
					name="solvedText"
					rows={5}
					// required
					placeholder="Text displayed to the user when the riddle is solved"
				/>
				<FileUploader
					name="solvedImage"
					control={control}
					label="Riddle solution picture"
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

	const { fields, append, remove } = useFieldArray({
		name: 'questions',
		control,
		rules: { minLength: 1 }
	});

	const secondStep = (
		<FormContainer onSuccess={onSubmitIntermediate} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<Typography variant="h2">{riddleName}</Typography>
				{fields.map((field, index) => (
					<QuestionUpsertAccordion
						control={control}
						key={field.id}
						index={index}
					/>
				))}
				<Button
					variant="contained"
					onClick={() =>
						append({
							questionText: '',
							image: '',
							hints: [],
							correctAnswers: [{ text: '' }]
						})
					}
				>
					<Typography fontWeight="bold">+ Add question</Typography>
				</Button>
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
