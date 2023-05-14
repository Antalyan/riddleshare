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
import type { Dispatch, FC, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import type { RiddleDisplayDetail } from '../../../utils/Types';
import { getQuestionStateIcon, RiddleStatus } from '../../../utils/Statuses';
import { AlertDialog } from '../common/AlertDialog';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { storeRiddleAnswerInfo } from '../../../datastore/storingFunctions';

import { HintsDisplay } from './HintsDisplay';

type Props = {
	setRiddleData: Dispatch<SetStateAction<RiddleDisplayDetail>>;
	riddleData: RiddleDisplayDetail;
	questionNumber: number;
};

export const QuestionSolvingAccordion: FC<Props> = ({
	setRiddleData,
	riddleData,
	questionNumber
}) => {
	const {
		order,
		solved,
		available,
		correctAnswers,
		questionText,
		questionImage,
		hints
	} = riddleData.questions[questionNumber - 1];

	const user = useLoggedInUser();

	const [dialogOpen, setDialogOpen] = useState(false);
	const [answer, setAnswer] = useState('');
	const handleClose = () => {
		setDialogOpen(false);
	};

	const handleSubmitAnswer = useCallback(() => {
		console.log(answer);
		const answerIsCorrect = correctAnswers
			.map(a => a.toUpperCase())
			.includes(answer.toUpperCase());

		riddleData.questions[questionNumber - 1].answers.push({
			username: user?.email ?? '',
			answerText: answer,
			correct: answerIsCorrect
		});
		if (answerIsCorrect) {
			setIsSolved(true);
			setDialogOpen(true);
			riddleData.solvedQuestions++;
			riddleData.state =
				riddleData.solvedQuestions === riddleData.numberOfQuestions
					? RiddleStatus.Solved
					: RiddleStatus.Unfinished;
			riddleData.questions[questionNumber - 1].solved = true;
			if (
				riddleData.questionOrder === 'sequence' &&
				riddleData.solvedQuestions !== riddleData.numberOfQuestions
			) {
				riddleData.questions[questionNumber].available = true; // Make next question available
			}
		} else {
			riddleData.state = RiddleStatus.Unfinished;
			setShowError(true);
		}
		setRiddleData({ ...riddleData }); //Force rerender
		storeRiddleAnswerInfo(riddleData, user!);
	}, [answer]);

	const [showError, setShowError] = useState(false);

	const [isSolved, setIsSolved] = useState(solved);

	return (
		<>
			<Accordion disabled={!available}>
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
								{hints.length > 0 && (
									<HintsDisplay
										questionNumber={questionNumber}
										hints={hints}
										riddleData={riddleData}
									/>
								)}
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
				content={`Your answer ${answer.toUpperCase()} is correct!`}
				open={dialogOpen}
				handleClose={handleClose}
			/>
		</>
	);
};
