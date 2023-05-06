import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Grid,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { QuestionDisplayDetail } from '../../../utils/Types';
import { getQuestionStateIcon } from '../../../utils/Statuses';

import { HintsDisplay } from './HintsDisplay';

type Props = QuestionDisplayDetail;

export const QuestionSolvingAccordion = ({
	number,
	solved,
	available,
	questionText,
	image,
	hints,
	hintsTaken
}: Props) => {
	const [answer, setAnswer] = useState('');
	const handleSubmitAnswer = useCallback(() => {
		console.log(answer);
		//TODO: save answer to db
		//TODO validate answer and show corresponding reaction correct x incorrect
		setAnswer('');
	}, [answer]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Stack
					direction="row"
					gap={2}
					justifyContent="space-between"
					alignItems="center"
					width="100%"
				>
					<Typography variant="h6" color="primary.main">
						Question {number}
					</Typography>
					{getQuestionStateIcon(solved, available)}
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container spacing={2} sx={{ minWidth: { md: 400 } }}>
					{image && (
						<Grid item xs={12} md={6}>
							<Box
								component="img"
								src={image}
								sx={{
									display: 'flex',
									justifyContent: 'flex-start',
									maxWidth: '100%',
									maxHeight: '300px',
									objectFit: 'contain',
									objectPosition: 'left'
								}}
							/>
						</Grid>
					)}
					<Grid item xs={12} md={image ? 6 : 12}>
						<Stack gap={2}>
							<Typography variant="subtitle1">{questionText}</Typography>
							{hints.length > 0 && (
								<HintsDisplay hints={hints} hintsTaken={hintsTaken} />
							)}
							<Stack
								direction="row"
								gap={2}
								justifyContent="flex-start"
								alignItems="center"
								width="100%"
							>
								<TextField
									name="answer"
									size="small"
									label="Answer"
									onChange={e => setAnswer(e.target.value)}
									value={answer}
								/>
								<Button
									type="submit"
									variant="contained"
									onClick={handleSubmitAnswer}
								>
									Submit
								</Button>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};
