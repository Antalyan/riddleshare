import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import type { UseFormReturn } from 'react-hook-form-mui';
import { FormContainer, useFieldArray } from 'react-hook-form-mui';
import React, { useEffect, useState } from 'react';
import { Cancel } from '@mui/icons-material';

import type { RiddleUpsertDetail } from '../../../utils/Types';
import { RadioButtonFormComponentBroad } from '../common/RadioButtonFormComponentBroad';

import { QuestionUpsertAccordion } from './QuestionUpsertAccordion';

type Props = {
	formContext: UseFormReturn<RiddleUpsertDetail>;
	riddleName: string | null;
	handleNext: () => void;
	handleBack: () => void;
	onCancel: () => void;
};

export const RiddleQuestionForm = ({
	formContext,
	riddleName,
	handleNext,
	handleBack,
	onCancel
}: Props) => {
	const { watch, control } = formContext;
	const { fields, append, remove } = useFieldArray({
		name: 'questions',
		control,
		rules: { minLength: 1 }
	});
	const watchQuestions = watch('questions');
	const minLength = 1;

	const [disableQuestionDelete, setDisableQuestionDelete] = useState(true);
	useEffect(() => {
		setDisableQuestionDelete(fields.length === 1);
	}, [fields.length]);

	return (
		<FormContainer formContext={formContext}>
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
							disabled={disableQuestionDelete}
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
						onClick={handleNext}
					>
						Proceed
					</Button>
				</Box>
			</Stack>
		</FormContainer>
	);
};