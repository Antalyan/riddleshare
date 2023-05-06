import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import {
	MockDisplayQuestions,
	MockRiddlesPreviews
} from '../../mock-data/MockData';
import { RiddleCard } from '../components/RiddleCard';
import { QuestionSolvingAccordion } from '../components/forms/solvingForm/QuestionSolvingAccordion';

export const RiddleSolvingPage: FC = () => {
	const { id } = useParams();
	return <QuestionSolvingAccordion {...MockDisplayQuestions[id - 1]} />;
};

//TODO!
