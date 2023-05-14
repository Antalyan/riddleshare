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

export const RiddleSolvingPage: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useLoggedInUser();

	const {riddleData, setRiddleData} = useRiddleComplexDetailFetch(id ?? '', user?.email ?? '');

	return riddleData ? (
		<Stack gap={2}>
			<Typography variant="h4" fontWeight="bold">
				{riddleData.name}
			</Typography>

			{riddleData.questions.map(question => (
				<QuestionSolvingAccordion
					riddleData={riddleData}
					// @ts-ignore
					setRiddleData={setRiddleData}
					questionNumber={question.order}
					key={question.order}
				/>
			))}
			{riddleData.state === RiddleStatus.Solved && (
				<Card sx={{ backgroundColor: 'background.default' }}>
					{riddleData.solvedImage && (
						<CardMedia
							component="img"
							image={riddleData.solvedImage}
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
						{riddleData.solvedText}
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
