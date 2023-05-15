import type { FC, ReactNode } from 'react';
import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
	label: string;
	value: string | ReactNode;
};

export const InfoLine: FC<Props> = ({ label, value }) => (
	<Box
		sx={{
			display: 'flex',
			columnGap: { xs: 'initial', sm: 2 },
			flexDirection: { xs: 'column', sm: 'row' },
			mb: 1
		}}
	>
		<Typography variant="h6" fontWeight="bold">
			{label}:
		</Typography>
		<Typography
			variant="h6"
			sx={{ display: 'flex', alignItems: 'center', wordBreak: 'break-all' }}
		>
			{value}
		</Typography>
	</Box>
);
