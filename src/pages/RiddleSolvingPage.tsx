import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Stack,
	Typography
} from '@mui/material';

import { QuestionSolvingAccordion } from '../components/forms/solvingForm/QuestionSolvingAccordion';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RiddleStatus } from '../utils/Statuses';
import { useRiddleComplexDetailFetch } from '../hooks/useRiddleComplexDetailFetch';
import { LoadingComponent } from '../components/LoadingComponent';

export const RiddleSolvingPage: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useLoggedInUser();

	const { riddle, setRiddle, isLoading } = useRiddleComplexDetailFetch(
		id ?? '',
		user?.email ?? ''
	);

	if (isLoading) {
		return <LoadingComponent />;
	}

	return riddle ? (
		<Stack gap={2}>
			<Typography variant="h4" fontWeight="bold">
				{riddle.name}
			</Typography>

			{riddle.questions.map(question => (
				<QuestionSolvingAccordion
					riddleData={riddle}
					// @ts-ignore
					setRiddleData={setRiddle}
					questionNumber={question.order}
					key={question.order}
				/>
			))}
			{riddle.state === RiddleStatus.Solved && (
				<Card sx={{ backgroundColor: 'background.default' }}>
					{riddle.solvedImage && (
						<CardMedia
							component="img"
							image={riddle.solvedImage}
							alt="Riddle solution image"
							sx={{
								p: 2,
								objectFit: 'contain',
								maxHeight: '300px'
							}}
						/>
					)}
					<CardContent>
						<Typography variant="h5" color="secondary.main">
							The riddle has been solved!
						</Typography>
						{riddle.solvedText}
					</CardContent>
				</Card>
			)}

			<Button
				variant="contained"
				sx={{ backgroundColor: 'primary.light', maxWidth: 200 }}
				onClick={() => navigate(-1)}
			>
				Back to detail
			</Button>
		</Stack>
	) : null;
};
