import type { FC, ReactNode } from 'react';
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
	content: ReactNode;
	open: boolean;
	handleClose: () => void;
};

export const AlertDialog: FC<Props> = ({
	name,
	content,
	open,
	handleClose
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle sx={{ fontWeight: 'bold' }}>{name}</DialogTitle>
		<DialogContent>
			<DialogContentText sx={{ color: 'text.primary' }}>
				{content}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" onClick={handleClose}>
				Close
			</Button>
		</DialogActions>
	</Dialog>
);
