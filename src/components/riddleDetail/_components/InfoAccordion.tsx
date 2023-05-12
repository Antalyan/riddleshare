import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Chip,
	Divider,
	Stack,
	Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useState } from 'react';

import { AlertDialog } from '../../forms/common/AlertDialog';
import type { UserRiddleInfoDb } from '../../../utils/DbTypes';

type Props = {
	label: string;
	solvers: string[] | UserRiddleInfoDb[];
};

export const InfoAccordion = ({ label, solvers }: Props) => {
	const [solver, setSolver] = useState<UserRiddleInfoDb | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const handleOpen = useCallback((s: UserRiddleInfoDb) => {
		setSolver(s);
		setIsDialogOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setIsDialogOpen(false);
		setSolver(null);
	}, []);

	return (
		<>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Stack
						direction="row"
						gap={1}
						justifyContent="start"
						alignItems="center"
					>
						<Typography variant="h6" color="secondary.main" fontWeight="bold">
							{label}
						</Typography>
						<Avatar>{solvers.length}</Avatar>
					</Stack>
				</AccordionSummary>
				<AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					{solvers.map(solver => {
						if (typeof solver === 'string') {
							// case of "shared with"
							return <Chip key={solver} label={solver} />;
						} else {
							// case of "(un)successful solvers"
							return (
								<Chip
									key={solver.userEmail}
									label={solver.userEmail}
									onClick={() => handleOpen(solver)}
								/>
							);
						}
					})}
				</AccordionDetails>
			</Accordion>

			<AlertDialog
				name={`Answers of ${solver?.userEmail}`}
				content={
					solver?.questions
						? Object.keys(solver.questions).map(questionNumber => (
								<Box key={questionNumber}>
									<Typography variant="h6">
										Question {questionNumber}
									</Typography>
									<Divider sx={{ mb: 1 }} />
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
										{solver.questions[questionNumber].answers.map(
											(answer: string) => (
												<Chip key={answer} label={answer} />
											)
										)}
									</Box>
									<br />
								</Box>
						  ))
						: null
				}
				open={isDialogOpen}
				handleClose={handleClose}
			/>
		</>
	);
};
