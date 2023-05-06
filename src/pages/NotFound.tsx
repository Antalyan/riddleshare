import type { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	return (
		<Stack gap={2} alignItems="center" justifyContent="center">
			<Typography variant="h2" textAlign="center">
				Oops!
			</Typography>
			<Typography variant="h4" textAlign="center">
				Page not found
			</Typography>
			<Typography textAlign="center">
				Sorry, but the requested page is not found. Please go back to the
				homepage.
			</Typography>
			<Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
				Go to homepage
			</Button>
		</Stack>
	);
};
