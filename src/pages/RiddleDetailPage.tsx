import type { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';

import { MockRiddleUpsertDetails } from '../../mock-data/MockData';

const RiddleDetailPage: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	// TODO: Exchange by proper API call
	const riddleDetail = MockRiddleUpsertDetails.find(
		mockRiddleDetail => mockRiddleDetail.id === parseInt(id as string)
	);

	if (!riddleDetail) {
		return <Navigate to="/not-found" replace />;
	}

	const { language, description, difficulty, image, name, questions } =
		riddleDetail;

	return (
		<Stack gap={2}>
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
						Number of questions:
					</Typography>
					<Typography
						variant="h6"
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						{questions?.length}
					</Typography>
				</Box>
			</Box>

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
						/* TODO */
					}}
				>
					Try to solve
				</Button>
			</Box>
		</Stack>
	);
};

export default RiddleDetailPage;
