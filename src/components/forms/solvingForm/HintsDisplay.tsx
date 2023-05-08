import { Box, Button, Paper, Typography } from '@mui/material';
import { Lightbulb } from '@mui/icons-material';
import { useCallback, useState } from 'react';

import type { HintDisplay } from '../../../utils/Types';

type Props = {
	hints: HintDisplay[];
};

export const HintsDisplay = ({ hints }: Props) => {
	const hintsTaken = hints.filter(h => h.taken).length;
	const [hintState, setHintState] = useState(hintsTaken);
	const allHintsTaken = hintState === hints.length;

	const handleAskForHint = useCallback(() => {
		//TODO: store to db info about hint taken
		setHintState(prevState => prevState + 1);
	}, []);
	return (
		<>
			<Typography variant="h6" fontWeight="bold" color="primary.main">
				Hints
			</Typography>
			{hints.slice(0, hintState).map(hint => (
				<Paper
					key={hint.order}
					elevation={3}
					sx={{
						backgroundColor: 'background.default',
						p: 2,
						maxWidth: '100%'
					}}
				>
					<>
						<Box display="flex" gap={2}>
							<Typography variant="h6" color="primary.light">
								Hint {hint.order}
							</Typography>
							<Lightbulb sx={{ color: 'primary.light' }} />
						</Box>
						<Typography>{hint.hintText}</Typography>
					</>
				</Paper>
			))}
			{!allHintsTaken && (
				<Button
					variant="contained"
					onClick={handleAskForHint}
					sx={{ backgroundColor: 'primary.light', maxWidth: 150 }}
				>
					Show next hint
				</Button>
			)}
		</>
	);
};
