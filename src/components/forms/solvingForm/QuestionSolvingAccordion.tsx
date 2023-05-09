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

import type { RiddleDisplayDetail } from '../../../utils/Types';
import { getQuestionStateIcon, RiddleStatus } from '../../../utils/Statuses';
import { AlertDialog } from '../common/AlertDialog';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { storeInfoAfterAnswer } from '../../../datastore/storingFunctions';

import { HintsDisplay } from './HintsDisplay';

type Props = {
	setRiddleData: React.Dispatch<
		React.SetStateAction<RiddleDisplayDetail | undefined>
	>;
	riddleData: RiddleDisplayDetail;
	questionNumber: number;
};

// TODO: sequential variant (unlock next only when previous one is solved)

export const QuestionSolvingAccordion = ({
	setRiddleData,
	riddleData,
	questionNumber
}: Props) => {
	const {
		order,
		solved,
		available,
		correctAnswers,
		questionText,
		questionImage,
		hints
	} = riddleData.questions[questionNumber];

	const user = useLoggedInUser();

	const [dialogOpen, setDialogOpen] = useState(false);

	const [answer, setAnswer] = useState('');
	const handleSubmitAnswer = useCallback(() => {
		console.log(answer);
		const answerIsCorrect = correctAnswers
			.map(a => a.toUpperCase())
			.includes(answer.toUpperCase());

		riddleData.questions[questionNumber].answers.push({
			username: user?.email ?? '',
			answerText: answer,
			correct: answerIsCorrect
		});
		if (answerIsCorrect) {
			setDialogOpen(true);
			const riddleDataCopy: RiddleDisplayDetail = { ...riddleData };
			riddleDataCopy.solvedQuestions++;
			riddleDataCopy.state =
				riddleDataCopy.solvedQuestions === riddleDataCopy.numberOfQuestions
					? RiddleStatus.Solved
					: RiddleStatus.Unfinished;
			riddleDataCopy.questions[questionNumber].solved = true;
			if (
				riddleDataCopy.questionOrder === 'sequence' &&
				riddleDataCopy.solvedQuestions !== riddleDataCopy.numberOfQuestions
			) {
				riddleDataCopy.questions[questionNumber + 1].available = true;
			}
			setRiddleData(riddleDataCopy);
		} else {
			setShowError(true);
		}
		storeInfoAfterAnswer(riddleData, user!);
	}, [answer]);

	const [showError, setShowError] = useState(false);

	const [isSolved, setIsSolved] = useState(solved);

	const handleClose = () => {
		setDialogOpen(false);
		setIsSolved(true);
	};

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
							Question {order}
						</Typography>
						{getQuestionStateIcon(isSolved, available)}
					</Stack>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2} sx={{ minWidth: { md: 400 } }}>
						{questionImage && (
							<Grid item xs={12} md={6}>
								<Box
									component="img"
									src={questionImage}
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
						<Grid item xs={12} md={questionImage ? 6 : 12}>
							<Stack gap={2}>
								<Typography variant="subtitle1">{questionText}</Typography>
								{hints.length > 0 && <HintsDisplay hints={hints} />}
								{isSolved ? (
									<Typography>
										<Typography
											variant="h6"
											fontWeight="bold"
											color="primary.main"
										>
											Solution
										</Typography>
										{correctAnswers[0]}
									</Typography>
								) : (
									<Stack
										direction="row"
										gap={2}
										justifyContent="flex-start"
										alignItems="start"
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
				handleClose={handleClose}
			/>
		</>
	);
};
