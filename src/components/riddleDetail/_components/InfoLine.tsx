import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
	label: string;
	value: string | React.ReactNode;
};

export const InfoLine = ({ label, value }: Props) => (
	<Box sx={{ display: 'flex', columnGap: 2 }}>
		<Typography variant="h6" fontWeight="bold">
			{label}:
		</Typography>
		<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
			{value}
		</Typography>
	</Box>
);
