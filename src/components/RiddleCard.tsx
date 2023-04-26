import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip
} from '@mui/material';
import {
	CancelRounded,
	CheckCircleOutlineRounded,
	HelpOutlineRounded
} from '@mui/icons-material';
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';
import { useMemo } from 'react';

import { CountryCode } from '../utils/CountryCodes.ts';
import {
	Difficulty,
	DifficultyType,
	getDifficultyObject
} from '../utils/Difficulty.ts';
import { RiddleStatus } from '../utils/Enums.ts';

type Props = {
	name: string;
	image: string;
	state: RiddleStatus;
	countryCode: CountryCode;
	difficulty: Difficulty;
};

const getIcon = (state: RiddleStatus) => {
	switch (state) {
		case RiddleStatus.Unfinished:
			return <HelpOutlineRounded />;
		case RiddleStatus.Solved:
			return <CheckCircleOutlineRounded />;
		default:
			return <CancelRounded />;
	}
};

export const RiddleCard = ({
	name,
	image,
	state,
	countryCode,
	difficulty
}: Props) => (
	// const difficulty = useMemo(
	// 	() => getDifficultyObject(difficultyType),
	// 	[difficultyType]
	// ); //TODO: Move to data fetching parent

	<Card>
		<CardHeader action={getIcon(state)} />
		<CardMedia component="img" image={image} alt={name} />
		{/*//TODO: image fetching from db*/}
		<CardContent>
			{name}
			<Chip
				icon={<CircleFlag countryCode={countryCode} height={35} />}
				label="Country name" //TODO: Replace with localized country name
				variant="outlined"
			/>
			<Chip
				icon={<LensIcon sx={{ color: difficulty?.color }} />}
				label={difficulty?.name} //TODO: Replace with localized difficulty name
				variant="outlined"
			/>
		</CardContent>
	</Card>
);
