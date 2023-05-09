import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import { QuestionSolvingAccordion } from '../components/forms/solvingForm/QuestionSolvingAccordion';
import { fetchComplexRiddleDetail } from '../datastore/fetchingFunctions';
import type { RiddleDisplayDetail } from '../utils/Types';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RiddleStatus } from '../utils/Statuses';

export const RiddleSolvingPage: FC = () => {
	const { id } = useParams();
	const user = useLoggedInUser();

	if (!user) {
		throw new Error('Undefined user accesses protected page');
	}

	const [riddleData, setRiddleData] = useState<RiddleDisplayDetail>();
	useEffect(() => {
		const loadRiddle = async () => {
			const riddle = await fetchComplexRiddleDetail(id ?? '', user);
			setRiddleData(riddle);
		};
		loadRiddle();
	}, []);
	return riddleData ? (
		<Stack gap={2}>
			<Typography variant="h4" fontWeight="bold">
				{riddleData.name}
			</Typography>

			{riddleData.questions.map((question, index) => (
				<QuestionSolvingAccordion
					riddleData={riddleData}
					// @ts-ignore
					setRiddleData={setRiddleData}
					questionNumber={question.order ?? index}
					key={question.order!}
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
			)}
		</Stack>
	) : (
		<></>
	);
};
