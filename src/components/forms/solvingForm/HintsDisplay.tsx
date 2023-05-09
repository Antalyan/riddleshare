import { Box, Button, Paper, Typography } from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

import type { Hint, RiddleDisplayDetail } from '../../../utils/Types';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { storeRiddleAnswerInfo } from '../../../datastore/storingFunctions';

type Props = {
	questionNumber: number;
	hints: Hint[];
	riddleData: RiddleDisplayDetail;
};

export const HintsDisplay = ({ hints, riddleData, questionNumber }: Props) => {
	const user = useLoggedInUser();
	const [hintsTaken, setHintsTaken] = useState(
		riddleData.questions[questionNumber - 1].hintsTaken
	);
	const allHintsTaken = hintsTaken === hints.length;

	const handleAskForHint = useCallback(() => {
		riddleData.questions[questionNumber - 1].hintsTaken++;
		setHintsTaken(prev => prev + 1);
		storeRiddleAnswerInfo(riddleData, user!);
	}, [riddleData, user]);
	return (
		<>
			<Typography variant="h6" fontWeight="bold" color="primary.main">
				Hints
			</Typography>
			{hints.slice(0, hintsTaken).map(hint => (
				<Paper
					key={hint.order}
					elevation={3}
					sx={{
						backgroundColor: 'background.default',
						p: 2,
						maxWidth: '100%'
					}}
				>
					<>
						<Box display="flex" gap={2}>
							<Typography variant="h6" color="primary.light">
								Hint {hint.order}
							</Typography>
							<Lightbulb sx={{ color: 'primary.light' }} />
						</Box>
						<Typography>{hint.hintText}</Typography>
					</>
				</Paper>
			))}
			{!allHintsTaken && (
				<Button
					variant="contained"
					onClick={handleAskForHint}
					sx={{ backgroundColor: 'primary.light', maxWidth: 150 }}
				>
					Show next hint
				</Button>
			)}
		</>
	);
};
