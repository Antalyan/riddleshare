import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	Stack,
	Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Cancel } from '@mui/icons-material';
import { TextFieldElement, useFieldArray } from 'react-hook-form-mui';
import type { Control } from 'react-hook-form';
import { useEffect, useState } from 'react';

import type {
	QuestionUpsertDetail,
	RiddleUpsertDetail
} from '../utils/Types.ts';

import { FileUploader } from './forms/FileUploader.tsx';
import { HintsUpsert } from './HintsUpsert.tsx';
import { AnswersUpsert } from './AnswersUpsert.tsx';

type Props = {
	index: number;
	control: Control<RiddleUpsertDetail>;
};

export const QuestionUpsertAccordion = ({ index, control }: Props) => {
	const minLength = 1;

	const { fields, remove } = useFieldArray({
		name: `questions`,
		control
	});

	const [disableDelete, setDisableDelete] = useState(true);
	useEffect(() => {
		setDisableDelete(fields.length === 1);
		console.log(disableDelete);
	}, [fields.length]);

	return (
		<Stack direction="row" alignItems="flex-start" width="100%">
			<Accordion sx={{ flexGrow: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h6">Question {index + 1}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack gap={2} sx={{ minWidth: { md: 400 } }}>
						<TextFieldElement
							label="Question text"
							multiline
							name={`questions.${index}.questionText`}
							rows={5}
							// required
							placeholder="Text of the question"
						/>
						<FileUploader
							name={`questions.${index}.questionImage`}
							control={control}
							label="Question picture"
						/>
						<HintsUpsert control={control} questionIndex={index} />
						<AnswersUpsert control={control} questionIndex={index} />
					</Stack>
				</AccordionDetails>
			</Accordion>
			{/*//TODO: Fix broken delete of question (works for subcomponents)*/}
			<IconButton
				onClick={() => fields.length > minLength && remove(index)}
				sx={{ m: 1 }}
			>
				<Cancel />
			</IconButton>
		</Stack>
	);
};
