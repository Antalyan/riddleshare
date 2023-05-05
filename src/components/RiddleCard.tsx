import {
	Box,
	Button,
	Card,
	CardContent,
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
import { Link } from 'react-router-dom';

import { RiddleStatus } from '../utils/Enums';
import type { RiddlePreview } from '../utils/Types';

const stateIconStyle = {
	position: 'absolute',
	right: 0,
	top: 0,
	m: 1,
	p: 0.1,
	backgroundColor: 'background.default',
	borderRadius: '50%'
};

const getStateIcon = (state: RiddleStatus) => {
	switch (state) {
		case RiddleStatus.Unfinished:
			return <HelpOutlineRounded color="warning" sx={stateIconStyle} />;
		case RiddleStatus.Solved:
			return <CheckCircleOutlineRounded color="success" sx={stateIconStyle} />;
		default:
			return <CancelRounded color="error" sx={stateIconStyle} />;
	}
};

export const RiddleCard: FC<RiddlePreview> = ({
	name,
	id,
	image,
	state,
	language,
	difficulty
}) => (
	// const difficulty = useMemo(
	// 	() => getDifficultyObject(difficultyType),
	// 	[difficultyType]
	// ); //TODO: Move to data fetching parent

	<Card
		sx={{
			width: '100%',
			height: { sm: '300px' },
			backgroundColor: 'background.default',
			position: 'relative',
			display: 'flex',
			alignItems: 'center'
		}}
	>
		{getStateIcon(state)}
		<Grid container justifyContent="center" alignItems="center">
			<Grid item xs={12} sm={6} justifyContent="center" alignItems="center">
				<CardMedia
					component="img"
					image={image ?? '/public/RiddlePreview.svg'}
					alt={name}
					sx={{
						maxHeight: { xs: '200px', sm: '300px' },
						p: 2,
						objectFit: 'contain'
					}}
				/>
				{/*//TODO: image fetching from db*/}
			</Grid>
			<Grid item xs={12} sm={6}>
				<CardContent sx={{ height: { sm: '300px' } }}>
					<Box
						sx={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
							alignItems: { xs: 'center', sm: 'initial' },
							rowGap: 4
						}}
					>
						<Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
							<Typography
								variant="h4"
								fontWeight="bold"
								sx={{
									width: '100%',
									display: '-webkit-box',
									overflow: 'hidden',
									wordWrap: 'break-word',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 2,
									textAlign: { xs: 'center', sm: 'left' }
								}}
							>
								{name}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: { xs: 'center', sm: 'start' },
									flexWrap: 'wrap',
									gap: 1
								}}
							>
								<Chip
									icon={<CircleFlag countryCode={countryCode} />}
									label="Language" //TODO: Replace with localized language
									variant="outlined"
								/>
								<Chip
									icon={
										<LensIcon
											color="disabled"
											sx={{ color: difficulty.color }}
										/>
									}
									label={difficulty.name}
									variant="outlined"
								/>
							</Box>
						</Stack>
						<Button
							component={Link}
							variant="contained"
							to={`/riddle-detail/${id}`}
							sx={{
								width: { xs: '100%', sm: 'initial' },
								maxWidth: { xs: '320px', sm: '200px' }
							}}
						>
							Detail
						</Button>
					</Box>
				</CardContent>
			</Grid>
		</Grid>
	</Card>
);
