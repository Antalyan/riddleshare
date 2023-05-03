import { AppBar, Box, MenuItem, Toolbar, Typography } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../firebase';

import { PageMenu } from './PageMenu';
import { NavigationItem } from './NavigationItem';

const navigationItems = [
	{
		name: 'Home',
		public: true,
		route: '/'
	},
	{
		name: 'Public riddles',
		public: true,
		route: '/public-riddles'
	},
	{
		name: 'Received riddles',
		public: false,
		route: '/received-riddles'
	},
	{
		name: 'My riddles',
		public: false,
		route: '/my-riddles'
	},
	{
		name: 'Create riddle',
		public: false,
		route: '/create-riddle'
	}
];

export const NavigationBar = () => {
	const user = useLoggedInUser();
	const pageItems = navigationItems
		.filter(i => (!user ? i.public : true))
		.map(item => (
			<NavigationItem key={item.name} name={item.name} route={item.route} />
		));

	const authenticationItem = !user ? (
		<NavigationItem name="Login" route="/login" />
	) : (
		<MenuItem onClick={signOut} sx={{ borderRadius: 5 }}>
			Logout
		</MenuItem>
	);

	return (
		<AppBar sx={{ position: 'sticky', backgroundColor: 'background.default' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography color="primary" variant="h5" fontWeight="bold">
					RiddleShare
				</Typography>
				<Box display={{ xs: 'block', md: 'none' }}>
					<PageMenu>
						{pageItems}
						{authenticationItem}
					</PageMenu>
				</Box>
				<Box
					display={{ xs: 'none', md: 'flex' }}
					sx={{ color: 'secondary.light' }}
					flexDirection="row"
					gap={2}
				>
					{pageItems}
					{authenticationItem}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
