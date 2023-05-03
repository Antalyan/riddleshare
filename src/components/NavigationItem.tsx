import { MenuItem } from '@mui/material';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigationItemProps = {
	name: string;
	route: string;
};

export const NavigationItem: FC<NavigationItemProps> = ({ name, route }) => {
	const navigate = useNavigate();

	return (
		<MenuItem onClick={() => navigate(route)} sx={{ borderRadius: 3 }}>
			{name}
		</MenuItem>
	);
};
