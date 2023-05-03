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
import { TextFieldElement } from 'react-hook-form-mui';
import type { Control } from 'react-hook-form';

import type {
	QuestionUpsertDetail,
	RiddleUpsertDetail
} from '../utils/Types.ts';

import { useFileUploader } from './forms/FileUploader.tsx';
import { HintsUpsert } from './HintsUpsert.tsx';

type Props = {
	index: number;
	removeFunction: () => void;
	control: Control<RiddleUpsertDetail>;
	questionDetail: QuestionUpsertDetail;
};

export const QuestionUpsertAccordion = ({
	index,
	removeFunction,
	control,
	questionDetail
}: Props) => {
	const questionImageLoader = useFileUploader(
		`questions.${index}.questionImage`,
		control,
		'Question picture'
	);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="h6">Question {index + 1}</Typography>
				<IconButton onClick={removeFunction}>
					<Cancel />
				</IconButton>
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
					{questionImageLoader}
					<HintsUpsert control={control} questionIndex={index} />
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
