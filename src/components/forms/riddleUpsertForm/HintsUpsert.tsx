import type { Control } from 'react-hook-form';
import { TextFieldElement, useFieldArray } from 'react-hook-form-mui';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import type { FC } from 'react';

import type { RiddleUpsertDetail } from '../../../utils/Types';

type Props = {
	control: Control<RiddleUpsertDetail>;
	questionIndex: number;
};

export const HintsUpsert: FC<Props> = ({ control, questionIndex }) => {
	const { fields, append, remove } = useFieldArray({
		name: `questions.${questionIndex}.hints`,
		control
	});
	return (
		<Stack gap={2} sx={{ minWidth: { md: 400 } }}>
			{fields.map((hint, index) => (
				<Stack key={hint.id} direction="row">
					<TextFieldElement
						name={`questions.${questionIndex}.hints.${index}.hintText`}
						label="Hint"
						required
						fullWidth
					/>
					<IconButton onClick={() => remove(index)} sx={{ m: 1 }}>
						<Cancel />
					</IconButton>
				</Stack>
			))}
			<Button
				variant="dashed"
				onClick={() =>
					append({
						hintText: ''
					})
				}
			>
				<Typography fontWeight="bold">+ Add hint</Typography>
			</Button>
		</Stack>
	);
};
