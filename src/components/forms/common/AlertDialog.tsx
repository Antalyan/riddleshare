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
	handleClose: () => void;
};

export const AlertDialog = ({ name, text, open, handleClose }: Props) => (
	<Dialog open={open} onClose={handleClose}>
		<DialogTitle sx={{ fontWeight: 'bold' }}>{name}</DialogTitle>
		<DialogContent>
			<DialogContentText sx={{ color: 'text.primary' }}>
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
