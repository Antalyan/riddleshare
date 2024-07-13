import { MenuItem } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigationItemProps = {
	name: string;
	route: string;
};

export const NavigationItem: FC<NavigationItemProps> = ({ name, route }) => {
	const navigate = useNavigate();
	const handleNavigate = (e: any) => {
		e.preventDefault();
		navigate(route);
	};

	return (
		<MenuItem
			component="a"
			href={route}
			onClick={handleNavigate}
			sx={{ borderRadius: 3 }}
		>
			{name}
		</MenuItem>
	);
};
