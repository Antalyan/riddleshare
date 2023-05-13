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

import type { RiddleUpsertDetail } from '../../../utils/Types';
import { FileUploader } from '../common/FileUploader';

import { HintsUpsert } from './HintsUpsert';
import { AnswersUpsert } from './AnswersUpsert';

type Props = {
	index: number;
	control: Control<RiddleUpsertDetail>;
};

export const QuestionUpsertAccordion = ({ index, control }: Props) => (
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

				{/* Questions can be later accompanied by pictures as well* /}

				{/*<FileUploader*/}
				{/*	name={`questions.${index}.questionImage`}*/}
				{/*	control={control}*/}
				{/*	label="Question picture"*/}
				{/*/>*/}
				<HintsUpsert control={control} questionIndex={index} />
				<AnswersUpsert control={control} questionIndex={index} />
			</Stack>
		</AccordionDetails>
	</Accordion>
);
