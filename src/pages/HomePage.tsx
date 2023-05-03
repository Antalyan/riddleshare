import type { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

export const HomePage: FC = () => {
	const navigate = useNavigate();
	const user = useLoggedInUser();

	return (
		<Stack gap={2} alignItems="center" justifyContent="center">
			<Typography variant="h3" textAlign="center">
				Create riddles, share them with your friends and have fun.
			</Typography>
			<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
				{user && (
					<Button
						variant="contained"
						onClick={() => navigate('/create-riddle')}
						sx={{ backgroundColor: 'primary.light' }}
					>
						Create a riddle
					</Button>
				)}
				<Button variant="contained" onClick={() => navigate('/public-riddles')}>
					Try to solve a riddle
				</Button>
			</Box>
		</Stack>
	);
};
