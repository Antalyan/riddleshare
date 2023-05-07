import type { Dispatch, SetStateAction } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';

type Props = {
	name: string;
	text: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	actionOnClose: () => void;
};

export const AlertDialog = ({
	name,
	text,
	open,
	setOpen,
	actionOnClose
}: Props) => {
	const handleClose = () => {
		setOpen(false);
		actionOnClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{name}</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ color: 'primary.light' }}>
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
