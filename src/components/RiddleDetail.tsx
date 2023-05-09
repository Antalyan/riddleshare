import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';

import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { RiddleStatus } from '../utils/Statuses';

type Props = {
	isCreatorView: boolean;
	riddleDetail: RiddleDisplayDetailSimple;
};

//TODO: Update component with details and variant for creator
export const RiddleDetail = ({ isCreatorView, riddleDetail }: Props) => {
	const navigate = useNavigate();

	if (!riddleDetail) {
		return <Navigate to="/not-found" replace />;
	}

	const {
		linkId,
		language,
		description,
		difficulty,
		image,
		name,
		numberOfQuestions,
		solvedQuestions,
		state
	} = riddleDetail;

	return (
		<Stack gap={2} flexGrow={1}>
			<Typography variant="h4" fontWeight="bold">
				{name}
			</Typography>

			<Box>
				<Box sx={{ display: 'flex', columnGap: 2 }}>
					<Typography variant="h6" fontWeight="bold">
						Language:
					</Typography>
					<Typography
						variant="h6"
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<CircleFlag countryCode={language} height={20} />
						&nbsp;
						{language}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', columnGap: 2 }}>
					<Typography variant="h6" fontWeight="bold">
						Expected difficulty:
					</Typography>
					<Typography
						variant="h6"
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<LensIcon color="disabled" sx={{ color: difficulty.color }} />
						&nbsp;
						{difficulty?.name}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', columnGap: 2 }}>
					<Typography variant="h6" fontWeight="bold">
						{state === RiddleStatus.Untouched
							? 'Number of questions:'
							: 'Solved questions:'}
					</Typography>
					<Typography
						variant="h6"
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						{`${
							state === RiddleStatus.Untouched ? '' : `${solvedQuestions}/`
						}${numberOfQuestions}`}
					</Typography>
				</Box>
			</Box>

			{/*//TODO: make conditional if img not compulsory*/}
			<Box
				component="img"
				alt={name}
				src={image}
				sx={{
					maxWidth: '100%',
					maxHeight: '300px',
					objectFit: 'contain'
				}}
			/>

			<Typography>{description}</Typography>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					columnGap: 1,
					mt: 2
				}}
			>
				<Button
					type="submit"
					variant="contained"
					sx={{ backgroundColor: 'primary.light', flex: 1, maxWidth: '200px' }}
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
				<Button
					type="submit"
					variant="contained"
					sx={{ flex: 1, maxWidth: '200px' }}
					onClick={() => {
						navigate(`/riddle-detail/${linkId}/solve`);
					}}
				>
					Try to solve
				</Button>
			</Box>
		</Stack>
	);
};