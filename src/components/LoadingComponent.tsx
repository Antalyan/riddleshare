import type { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoadingComponent: FC = () => (
	<Box
		sx={{
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}
	>
		<CircularProgress size={80} />
	</Box>
);
