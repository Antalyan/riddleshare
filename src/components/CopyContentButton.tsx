import { useState } from 'react';
import { ContentCopy } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';

type Props = {
	content: string;
};

export const CopyContentButton = ({ content }: Props) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(content);
	};

	return (
		<>
			<IconButton onClick={handleClick} color="primary">
				<ContentCopy />
			</IconButton>
			<Snackbar
				message="ííí"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				autoHideDuration={2000}
				onClose={() => setOpen(false)}
				open={open}
			>
				<Alert
					severity="success"
					sx={{ width: '100%', backgroundColor: 'background.default' }}
				>
					Riddle link copied to clipboard!
				</Alert>
			</Snackbar>
		</>
	);
};
