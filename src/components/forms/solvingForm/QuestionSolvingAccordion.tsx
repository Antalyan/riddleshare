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
import { AlertDialog } from '../common/AlertDialog';

import { HintsDisplay } from './HintsDisplay';

type Props = QuestionDisplayDetail;

export const QuestionSolvingAccordion = ({
	number,
	solved,
	available,
	correctAnswers,
	questionText,
	image,
	hints,
	hintsTaken
}: Props) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const [answer, setAnswer] = useState('');
	const handleSubmitAnswer = useCallback(() => {
		console.log(answer);
		//TODO: save answer to db
		if (correctAnswers.includes(answer.toUpperCase())) {
			setDialogOpen(true);
		} else {
			setShowError(true);
		}
	}, [answer]);

	const [showError, setShowError] = useState(false);

	const [isSolved, setIsSolved] = useState(solved);

	return (
		<>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Stack
						direction="row"
						gap={2}
						justifyContent="space-between"
						alignItems="center"
						width="100%"
					>
						<Typography variant="h6" color="secondary.main" fontWeight="bold">
							Question {number}
						</Typography>
						{getQuestionStateIcon(isSolved, available)}
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
								{isSolved ? (
									<Typography>
										<Typography
											variant="h6"
											fontWeight="bold"
											color="primary.main"
										>
											Solution{' '}
										</Typography>
										{correctAnswers[0]}
									</Typography>
								) : (
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
											error={showError}
											helperText={showError && 'The answer is not correct!'}
											onChange={e => {
												setShowError(false);
												setAnswer(e.target.value);
											}}
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
								)}
							</Stack>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			{/*//Dialog is displayed on correct solution*/}
			<AlertDialog
				name="Congratulations"
				text={`Your answer ${answer.toUpperCase()} is correct!`}
				open={dialogOpen}
				setOpen={setDialogOpen}
				actionOnClose={() => setIsSolved(true)}
			/>
		</>
	);
};
