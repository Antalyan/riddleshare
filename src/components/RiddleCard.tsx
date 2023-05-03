import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
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
import type { FC } from 'react';

import { RiddleStatus } from '../utils/Enums';
import type { RiddlePreview } from '../utils/Types';

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

export const RiddleCard: FC<RiddlePreview> = ({
	name,
	image,
	state,
	countryCode,
	difficulty
}) => (
	// const difficulty = useMemo(
	// 	() => getDifficultyObject(difficultyType),
	// 	[difficultyType]
	// ); //TODO: Move to data fetching parent

	<Card sx={{ width: '100%', backgroundColor: 'background.default' }}>
		<CardHeader action={getStateIcon(state)} sx={{ pb: 0 }} />
		<Grid container justifyContent="center" alignItems="center">
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
					image={image ?? 'public/RiddlePreview.svg'}
					alt={name}
					sx={{ maxWidth: 200, px: 2, pb: { xs: 2, sm: 4 } }}
				/>
				{/*//TODO: image fetching from db*/}
			</Grid>
			<Grid item xs={12} sm={6}>
				<CardContent>
					<Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
						<Typography
							variant="h3"
							fontWeight="bold"
							sx={{
								width: '100%',
								display: '-webkit-box',
								overflow: 'hidden',
								wordWrap: 'break-word',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2
							}}
						>
							{name}
						</Typography>
						<Stack spacing={1} direction="row">
							<Chip
								icon={<CircleFlag countryCode={countryCode} />}
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
						<Button variant="contained" color="secondary">
							Detail
						</Button>
					</Stack>
				</CardContent>
			</Grid>
		</Grid>
	</Card>
);
