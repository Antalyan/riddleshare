import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Stack,
	Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextFieldElement } from 'react-hook-form-mui';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import type { RiddleUpsertDetail } from '../../../utils/Types';

import { HintsUpsert } from './HintsUpsert';
import { AnswersUpsert } from './AnswersUpsert';

type Props = {
	index: number;
	control: Control<RiddleUpsertDetail>;
	isCreate: boolean;
};

export const QuestionUpsertAccordion: FC<Props> = ({
	index,
	control,
	isCreate
}) => (
	<Accordion sx={{ flexGrow: 1 }}>
		<AccordionSummary expandIcon={<ExpandMoreIcon />}>
			<Typography variant="h6">Question {index + 1}</Typography>
		</AccordionSummary>
		<AccordionDetails>
			<Stack gap={2} sx={{ minWidth: { md: 400 } }}>
				<TextFieldElement
					name={`questions.${index}.questionText`}
					label="Question text"
					placeholder="Text of the question"
					required
					multiline
					rows={5}
				/>

				{/* Questions can be later accompanied by pictures as well* /}

				{/*<FileUploader*/}
				{/*	name={`questions.${index}.questionImage`}*/}
				{/*	control={control}*/}
				{/*	label="Question picture"*/}
				{/*/>*/}

				<HintsUpsert
					control={control}
					questionIndex={index}
					isCreate={isCreate}
				/>
				<AnswersUpsert control={control} questionIndex={index} />
			</Stack>
		</AccordionDetails>
	</Accordion>
);
