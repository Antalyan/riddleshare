import type { FC } from 'react';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { InfoLine } from '../components/riddleDetail/InfoLine';

export const HomePage: FC = () => {
	const navigate = useNavigate();
	const user = useLoggedInUser();

	return (
		<Stack gap={2} alignItems="center" justifyContent="flex-start">
			<Box
				component="img"
				src="/RiddleMeThis.jpeg"
				sx={{
					maxWidth: '100%',
					objectFit: 'contain',
					objectPosition: 'center'
				}}
			/>
			<Typography variant="h3" textAlign="center">
				Create riddles, share them with your friends and have fun.
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
				{user && (
					<Button
						variant="contained"
						onClick={() => navigate('/create-riddle')}
						sx={{ backgroundColor: 'primary.light' }}
					>
						Create a riddle
					</Button>
				)}
				<Button
					variant="contained"
					onClick={() =>
						user ? navigate('/public-riddles') : navigate('/login')
					}
				>
					Try to solve a riddle
				</Button>
			</Box>
			<Typography variant="h4" textAlign="center" sx={{ mt: 10 }}>
				Project information
			</Typography>
			<Link href="https://github.com/Antalyan/riddleshare">
				<Typography variant="h6">Github repository</Typography>
			</Link>
			<InfoLine label="Authors" value="Ondřej Dacer, Michael Koudela" />
			<Typography variant="h6" textAlign="center">
				Made as a final project in{' '}
				<Typography variant="h6" component="span" fontWeight="bold">
					PV247 Modern development of user interfaces
				</Typography>{' '}
				taught at{' '}
				<Typography variant="h6" component="span" fontWeight="bold">
					Faculty of Informatics, Masaryk University, Brno
				</Typography>
			</Typography>
		</Stack>
	);
};
