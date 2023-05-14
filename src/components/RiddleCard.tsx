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
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { getRiddleStateIcon } from '../utils/Statuses';
import type { RiddlePreview } from '../utils/Types';
import { getDifficultyObject } from '../utils/Difficulty';

export const RiddleCard: FC<RiddlePreview> = ({
	creatorEmail,
	difficultyValue,
	image,
	language,
	linkId,
	name,
	state
}) => {
	const difficulty = useMemo(
		() => getDifficultyObject(difficultyValue),
		[difficultyValue]
	);
	return (
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
			{state !== undefined && getRiddleStateIcon(state)}
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
										icon={<AccountCircleIcon />}
										label={creatorEmail.split('@')[0]}
										variant="outlined"
									/>
									<Chip
										icon={<CircleFlag countryCode={language} height={18} />}
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
								to={`/riddle-detail/${linkId}`}
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
};
