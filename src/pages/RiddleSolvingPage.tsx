import type {FC} from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, CardContent, CardMedia, Stack, Typography} from '@mui/material';

import {MockDisplayQuestions} from '../../mock-data/MockData';
import {QuestionSolvingAccordion} from '../components/forms/solvingForm/QuestionSolvingAccordion';
import {fetchComplexRiddleDetail} from '../datastore/fetchComplexRiddleDetail';
import {RiddleDetail} from '../components/RiddleDetail';

const getRiddle = async (id: string) => {
	return await fetchComplexRiddleDetail(id);
};

export const RiddleSolvingPage: FC = () => {
	//TODO: replace with link id
	const { id } = useParams();
	// @ts-ignore TODO: fetch data about the riddle

	const [riddleData, setRiddleData] = useState(RiddleDetail);
	useEffect(() => {
		const riddle = getRiddle(id ?? '');
		setRiddleData(riddle);
	}, []);
	return (
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
	);
};

// TODO!
