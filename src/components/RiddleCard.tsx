import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import {
	CancelRounded,
	CheckCircleOutlineRounded,
	HelpOutlineRounded
} from '@mui/icons-material';

type State = 'unsolved' | 'solved' | 'notstarted';
type Props = {
	name: string;
	image: string;
	state: State;
};

const getIcon = (state: State) => {
	switch (state) {
		case 'notstarted':
			return <HelpOutlineRounded />;
		case 'solved':
			return <CheckCircleOutlineRounded />;
		default:
			return <CancelRounded />;
	}
};

export const RiddleCard = ({ name, image, state }: Props) => {
	const x = '';

	return (
		<Card>
			<CardHeader action={getIcon(state)} />
			<CardMedia component="img" image={image} alt={name} />
			<CardContent>{name}</CardContent>
		</Card>
	);
};
