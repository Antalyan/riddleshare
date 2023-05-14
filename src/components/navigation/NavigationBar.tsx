import {
	AppBar,
	Box,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useLoggedInUser from '../../hooks/useLoggedInUser';
import { signOut } from '../../datastore/firebase';

import { PageMenu } from './PageMenu';
import { NavigationItem } from './NavigationItem';

const navigationItems = [
	{
		name: 'Home',
		private: false,
		route: '/'
	},
	{
		name: 'Public riddles',
		private: false,
		route: '/public-riddles'
	},
	{
		name: 'Received riddles',
		private: true,
		route: '/received-riddles'
	},
	{
		name: 'My riddles',
		private: true,
		route: '/my-riddles'
	},
	{
		name: 'Create riddle',
		private: true,
		route: '/create-riddle'
	}
];

export const NavigationBar = () => {
	const user = useLoggedInUser();
	const pageItems = navigationItems
		.filter(i => (!user ? !i.private : true))
		.map(item => (
			<NavigationItem key={item.name} name={item.name} route={item.route} />
		));

	const currentUserItem = user ? (
		<Tooltip title={user.email} placement="bottom">
			<AccountCircleIcon />
		</Tooltip>
	) : null;

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
				<Box
					display={{ xs: 'flex', md: 'none' }}
					sx={{ alignItems: 'center', gap: 1 }}
				>
					{currentUserItem}
					<PageMenu>
						{pageItems}
						{authenticationItem}
					</PageMenu>
				</Box>
				<Box
					display={{ xs: 'none', md: 'flex' }}
					sx={{ color: 'secondary.light' }}
					flexDirection="row"
					alignItems="center"
					gap={2}
				>
					{pageItems}
					{authenticationItem}
					{currentUserItem}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
