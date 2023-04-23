import {
	AppBar,
	Box,
	Button,
	MenuItem,
	Toolbar,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { PageMenu } from './PageMenu.tsx';

export const Header = () => {
	const navigate = useNavigate();
	const pageItems = useMemo(
		() => (
			<>
				<MenuItem
					key="home"
					onClick={() => navigate('/')}
					sx={{ borderRadius: 5 }}
				>
					Home
				</MenuItem>
				<MenuItem
					key="public"
					onClick={() => navigate('/public-riddles')}
					sx={{ borderRadius: 5 }}
				>
					Public riddles
				</MenuItem>
				<MenuItem
					key="public"
					onClick={() => navigate('/received-riddles')}
					sx={{ borderRadius: 5 }}
				>
					Received riddles
				</MenuItem>
				<MenuItem
					key="public"
					onClick={() => navigate('/my-riddles')}
					sx={{ borderRadius: 5 }}
				>
					My riddles
				</MenuItem>
			</>
		),
		[]
	);

	return (
		<AppBar sx={{ position: 'sticky', backgroundColor: 'background.default' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography color="secondary" variant="h5" fontWeight="bold">
					RiddleShare
				</Typography>
				<Box display={{ xs: 'block', md: 'none' }}>
					<PageMenu> {pageItems}</PageMenu>
				</Box>
				<Box
					display={{ xs: 'none', md: 'flex' }}
					sx={{ color: 'secondary.light' }}
					flexDirection="row"
					gap={2}
				>
					{pageItems}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
