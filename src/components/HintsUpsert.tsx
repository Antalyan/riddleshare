import type { Control } from 'react-hook-form';
import { TextFieldElement, useFieldArray } from 'react-hook-form-mui';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { Cancel } from '@mui/icons-material';

import type { RiddleUpsertDetail } from '../utils/Types.ts';

type Props = {
	control: Control<RiddleUpsertDetail>;
	questionIndex: number;
};

export const HintsUpsert = ({ control, questionIndex }: Props) => {
	const { fields, append, remove } = useFieldArray({
		name: `questions.${questionIndex}.hints`,
		control
	});
	return (
		<Stack gap={2} sx={{ minWidth: { md: 400 } }}>
			{fields.map((hint, index) => (
				<Stack key={hint.id} direction="row">
					<TextFieldElement
						label="Hint"
						name={`questions.${questionIndex}.hints.${index}.hintText`}
						fullWidth
						// required
					/>
					<IconButton onClick={() => remove(index)} sx={{ m: 1 }}>
						<Cancel />
					</IconButton>
				</Stack>
			))}
			<Button
				variant="outlined"
				onClick={() =>
					append({
						hintText: '',
						order: fields.length + 1
					})
				}
			>
				<Typography fontWeight="bold">+ Add hint</Typography>
			</Button>
		</Stack>
	);
};
