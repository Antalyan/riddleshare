import {
	FormContainer,
	TextFieldElement,
	useFieldArray,
	useForm
} from 'react-hook-form-mui';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	IconButton,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import type { RiddleUpsertDetail } from '../../../utils/Types.ts';
import { getDifficultyObject } from '../../../utils/Difficulty.ts';
import { CopyContentButton } from '../common/CopyContentButton.tsx';
import { AutocompleteLanguages } from '../common/AutocompleteLanguages.tsx';
import { AutocompleteDifficulties } from '../common/AutocompleteDifficulties.tsx';
import { AutocompleteUsers } from '../common/AutocompleteUsers.tsx';
import { RadioButtonFormComponentBroad } from '../common/RadioButtonFormComponentBroad.tsx';
import { FileUploader } from '../common/FileUploader.tsx';

import { QuestionUpsertAccordion } from './QuestionUpsertAccordion.tsx';

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

	const { control, watch, reset } = formContext;

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

	const navigate = useNavigate();

	const onCancel = useCallback(() => {
		navigate('/');
	}, []);

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
						onClick={onCancel}
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

	const watchIsPublic = watch('sharingInformation.visibility');
	const watchLink = watch('linkId');
	const watchQuestions = watch('questions');

	const minLength = 1;
	const [disableDelete, setDisableDelete] = useState(true);
	useEffect(() => {
		setDisableDelete(fields.length === 1);
		console.log(disableDelete);
	}, [fields.length]);

	const secondStep = (
		<FormContainer onSuccess={onSubmitIntermediate} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<Typography variant="h2">{riddleName}</Typography>
				{fields.map((field, index) => (
					<Stack direction="row" alignItems="flex-start" width="100%">
						<QuestionUpsertAccordion
							control={control}
							key={field.id}
							index={index}
						/>
						<IconButton
							onClick={() => fields.length > minLength && remove(index)}
							sx={{ m: 1 }}
							disabled={disableDelete}
						>
							<Cancel />
						</IconButton>
					</Stack>
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
						{ id: 'sequence', label: 'Sequential' },
						{ id: 'parallel', label: 'Parallel' }
					]}
					name="questionOrder"
					label="Questions flow"
					disabled={watchQuestions.length === 1}
				/>
				<Box sx={{ width: '100%', display: 'flex', gap: '8px' }}>
					<Button
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
						onClick={onCancel}
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
						type="submit"
						variant="contained"
						sx={{ backgroundColor: 'primary.light', flex: 1 }}
						onClick={onCancel}
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
