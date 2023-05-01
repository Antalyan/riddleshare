import type { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
	const navigate = useNavigate();
	return (
		<Stack gap={2} alignItems="center" justifyContent="center" height="100vh">
			<Typography variant="h5" textAlign="center">
				Create riddles, share them with your friends and have fun.
			</Typography>
			<Button
				variant="contained"
				onClick={() => navigate('/create-riddle')}
				sx={{
					color: 'text.secondary',
					backgroundColor: 'primary.light',
					borderRadius: 3
				}}
			>
				Create a riddle
			</Button>
			<Button
				variant="contained"
				onClick={() => navigate('/public-riddles')}
				sx={{ color: 'text.secondary', borderRadius: 3 }}
			>
				Try to solve a riddle
			</Button>
		</Stack>
	);
};
