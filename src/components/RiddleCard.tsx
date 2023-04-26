import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	Container,
	Grid,
	Stack,
	Typography
} from '@mui/material';
import {
	CancelRounded,
	CheckCircleOutlineRounded,
	HelpOutlineRounded
} from '@mui/icons-material';
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';
import { FC, useMemo } from 'react';

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

const getStateIcon = (state: RiddleStatus) => {
	switch (state) {
		case RiddleStatus.Unfinished:
			return <HelpOutlineRounded color="warning" />;
		case RiddleStatus.Solved:
			return <CheckCircleOutlineRounded color="success" />;
		default:
			return <CancelRounded color="error" />;
	}
};

export const RiddleCard: FC<Props> = ({
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

	<Card sx={{ width: '100%', backgroundColor: 'background.default' }}>
		<CardHeader action={getStateIcon(state)} sx={{ pb: 0 }} />
		<Grid container>
			<Grid
				item
				xs={12}
				sm={6}
				container
				justifyContent="center"
				alignItems="center"
			>
				<CardMedia
					component="img"
					image={image}
					alt={name}
					sx={{ maxWidth: 200, px: 2, pb: { xs: 2, sm: 4 } }}
				/>
				{/*//TODO: image fetching from db*/}
			</Grid>
			<Grid item xs={12} sm={6}>
				<CardContent>
					<Stack spacing={2}>
						<Typography variant="h3" fontWeight="bold">
							{name}
						</Typography>
						<Stack spacing={1} direction="row">
							<Chip
								icon={
									<CircleFlag
										countryCode={countryCode.toLowerCase()}
										height="70%"
									/>
								}
								label="Country name" //TODO: Replace with localized country name
								variant="outlined"
							/>
							<Chip
								icon={
									<LensIcon color="disabled" sx={{ color: difficulty.color }} />
								}
								label={difficulty.name} //TODO: Replace with localized difficulty name
								variant="outlined"
							/>
						</Stack>
						<Button
							variant="outlined"
							sx={{
								borderRadius: 5,
								maxWidth: 200
							}}
						>
							DETAIL
						</Button>
					</Stack>
				</CardContent>
			</Grid>
		</Grid>
	</Card>
);
