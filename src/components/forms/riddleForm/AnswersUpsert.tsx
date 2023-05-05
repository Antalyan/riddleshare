import type { Control } from 'react-hook-form';
import { TextFieldElement, useFieldArray } from 'react-hook-form-mui';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import type { RiddleUpsertDetail } from '../../../utils/Types.ts';

type Props = {
	control: Control<RiddleUpsertDetail>;
	questionIndex: number;
};

export const AnswersUpsert = ({ control, questionIndex }: Props) => {
	const minLength = 1;
	const { fields, append, remove } = useFieldArray({
		name: `questions.${questionIndex}.correctAnswers`,
		control,
		rules: { minLength }
	});
	const [disableDelete, setDisableDelete] = useState(true);
	useEffect(() => {
		setDisableDelete(fields.length === 1);
		console.log(disableDelete);
	}, [fields.length]);

	return (
		<Stack gap={2} sx={{ minWidth: { md: 400 } }}>
			{fields.map((answer, index) => (
				<Stack key={answer.id} direction="row">
					<TextFieldElement
						label="Correct answer"
						name={`questions.${questionIndex}.correctAnswers.${index}.text`}
						fullWidth
						// required
					/>
					<IconButton
						sx={{ m: 1 }}
						onClick={() => fields.length > minLength && remove(index)}
						disabled={disableDelete}
					>
						<Cancel />
					</IconButton>
				</Stack>
			))}
			<Button variant="dashed" onClick={() => append({ text: '' })}>
				<Typography fontWeight="bold">+ Add correct answer</Typography>
			</Button>
		</Stack>
	);
};
