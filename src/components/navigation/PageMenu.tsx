import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PageMenu: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		handleClose();
	}, [location]);

	return (
		<>
			<IconButton
				id="header.pagemenu"
				aria-label="pagemenu"
				aria-controls={open ? 'long-page' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="page-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						backgroundColor: 'background.default',
						color: 'secondary.light'
					}
				}}
			>
				{children}
			</Menu>
		</>
	);
};
