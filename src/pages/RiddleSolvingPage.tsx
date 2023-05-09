import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import { MockDisplayQuestions } from '../../mock-data/MockData';
import { QuestionSolvingAccordion } from '../components/forms/solvingForm/QuestionSolvingAccordion';
import { fetchComplexRiddleDetail } from '../datastore/fetchComplexRiddleDetail';
import { RiddleDetail } from '../components/RiddleDetail';
import type { RiddleDisplayDetail } from '../utils/Types';

export const RiddleSolvingPage: FC = () => {
	const { id } = useParams();

	const [riddleData, setRiddleData] = useState<RiddleDisplayDetail>();
	useEffect(() => {
		const loadRiddle = async () => {
			const riddle = await fetchComplexRiddleDetail(id ?? '');
			setRiddleData(riddle);
		};
		loadRiddle();
	}, []);
	return riddleData ? (
		<Stack gap={2}>
			<Typography variant="h4" fontWeight="bold">
				{riddleData.name}
			</Typography>
			{/* TODO: replace with data fetch */}
			{MockDisplayQuestions.map(question => (
				<QuestionSolvingAccordion {...question} key={question.id} />
			))}
			<Card sx={{ backgroundColor: 'background.default' }}>
				{riddleData.solvedImage && (
					<CardMedia
						component="img"
						image={riddleData.solvedImage}
						alt="Riddle solution image"
						sx={{
							p: 2,
							objectFit: 'contain'
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
		</Stack>
	) : (
		<></>
	);
};

// TODO!
