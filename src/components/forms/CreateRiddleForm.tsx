import { FormContainer, useForm } from 'react-hook-form-mui';
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
	Stepper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { RiddleUpsertDetail } from '../../utils/Types';

import { TextFieldFormComponent } from './generic/TextFieldFormComponent';
import { AutocompleteLanguages } from './AutocompleteLanguages';
import { AutocompleteDifficulties } from './AutocompleteDifficulties';
import { AutocompleteUsers } from './AutocompleteUsers';
import { RadioButtonFormComponentBroad } from './generic/RadioButtonFormComponentBroad';

const steps = ['Basic information', 'Questions', 'Sharing options'];

export const CreateRiddleForm = () => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const formContext = useForm<RiddleUpsertDetail>();
	const onSubmit = useCallback(
		(data: RiddleUpsertDetail) => {
			console.log(data);
		},
		[formContext]
	);

	const firstStep = (
		<FormContainer onSuccess={onSubmit} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
				<TextFieldFormComponent name="name" label="Riddle name" required />
				<TextFieldFormComponent
					label="Description"
					multiline
					name="description"
					rows={5}
					required
				/>
				<AutocompleteLanguages />
				<AutocompleteDifficulties />
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
						onClick={handleNext}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);

	const secondStep = (
		<FormContainer onSuccess={onSubmit} formContext={formContext}>
			<Stack gap={2} sx={{ minWidth: { md: 500 } }}>
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
						onClick={handleNext}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);

	const thirdStep = (
		<FormContainer onSuccess={onSubmit} formContext={formContext}>
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
						optional?: React.ReactNode;
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
