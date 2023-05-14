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
	handleAction: () => void;
	actionButtonLabel: string;
};

export const ChoiceDialog: FC<Props> = ({
	actionButtonLabel,
	content,
	handleClose,
	handleAction,
	name,
	open
}) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle sx={{ fontWeight: 'bold' }}>{name}</DialogTitle>
		<DialogContent>
			<DialogContentText sx={{ color: 'text.primary' }}>
				{content}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				variant="contained"
				sx={{ backgroundColor: 'primary.light' }}
				onClick={handleClose}
			>
				Cancel
			</Button>
			<Button variant="contained" onClick={handleAction}>
				{actionButtonLabel}
			</Button>
		</DialogActions>
	</Dialog>
);
