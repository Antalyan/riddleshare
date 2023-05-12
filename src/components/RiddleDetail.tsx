import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';
import LensIcon from '@mui/icons-material/Lens';
import { useCallback, useEffect, useState } from 'react';

import type { RiddleDisplayDetailSimple } from '../utils/Types';
import { RiddleStatus } from '../utils/Statuses';
import { deleteUserRiddleInfo } from '../datastore/deletingQueries';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { fetchRiddleSolvers } from '../datastore/fetchingQueries';
import type { UserRiddleInfoDb } from '../utils/DbTypes';

import { InfoLine } from './riddleDetail/_components/InfoLine';
import { InfoAccordion } from './riddleDetail/_components/InfoAccordion';

type Props = {
	isCreatorView: boolean;
	riddleDetail: RiddleDisplayDetailSimple;
};

export const RiddleDetail = ({ isCreatorView, riddleDetail }: Props) => {
	const [successfulSolversData, setSuccessfulSolversData] = useState<
		UserRiddleInfoDb[]
	>([]);
	const [unsuccessfulSolversData, setUnsuccessfulSolversData] = useState<
		UserRiddleInfoDb[]
	>([]);
	const navigate = useNavigate();
	const user = useLoggedInUser();

	if (!riddleDetail) {
		return <Navigate to="/not-found" replace />;
	}

	const {
		linkId,
		language,
		description,
		difficulty,
		image,
		name,
		numberOfQuestions,
		solvedQuestions,
		state,
		sharingInformation
	} = riddleDetail;

	const fetchSolvers = useCallback(async () => {
		const solvers = await fetchRiddleSolvers(linkId);
		const successfulSolvers: UserRiddleInfoDb[] = [];
		const unsuccessfulSolvers: UserRiddleInfoDb[] = [];
		solvers.docs
			.map(doc => doc.data())
			.forEach(solver => {
				if (solver.state === RiddleStatus.Solved) {
					successfulSolvers.push(solver);
				} else {
					unsuccessfulSolvers.push(solver);
				}
			});
		setSuccessfulSolversData(successfulSolvers);
		setUnsuccessfulSolversData(unsuccessfulSolvers);
	}, []);

	useEffect(() => {
		if (!isCreatorView) {
			return;
		}
		fetchSolvers();
	}, []);

	return (
		<Stack gap={2}>
			<Typography variant="h4" fontWeight="bold">
				{name}
			</Typography>

			<Box>
				<InfoLine
					label="Language"
					value={
						<>
							<CircleFlag countryCode={language} height={20} />
							&nbsp;
							{language}
						</>
					}
				/>
				<InfoLine
					label="Expected difficulty"
					value={
						<>
							<LensIcon color="disabled" sx={{ color: difficulty.color }} />
							&nbsp;
							{difficulty?.name}
						</>
					}
				/>
				<InfoLine
					label={
						state === RiddleStatus.Untouched
							? 'Number of questions'
							: 'Solved questions'
					}
					value={`${
						state === RiddleStatus.Untouched ? '' : `${solvedQuestions}/`
					}${numberOfQuestions}`}
				/>
				{isCreatorView && (
					<InfoLine
						label="Availability"
						value={sharingInformation.visibility}
					/>
				)}
			</Box>

			{image && (
				<Box
					component="img"
					alt={name}
					src={image}
					sx={{
						maxWidth: '100%',
						maxHeight: '300px',
						objectFit: 'contain',
						objectPosition: 'left'
					}}
				/>
			)}

			<Typography>{description}</Typography>

			{isCreatorView && (
				<>
					<br />
					{(successfulSolversData.length > 0 ||
						unsuccessfulSolversData.length > 0) && (
						<InfoLine
							label="Success rate"
							value={`${
								(successfulSolversData.length /
									(successfulSolversData.length +
										unsuccessfulSolversData.length)) *
								100
							} % (${successfulSolversData.length}/${
								successfulSolversData.length + unsuccessfulSolversData.length
							})`}
						/>
					)}

					{sharingInformation.sharedUsers && (
						<InfoAccordion
							label="Shared with"
							solvers={sharingInformation.sharedUsers}
						/>
					)}
					{successfulSolversData.length > 0 && (
						<InfoAccordion
							label="Successful solvers"
							solvers={successfulSolversData}
						/>
					)}
					{unsuccessfulSolversData.length > 0 && (
						<InfoAccordion
							label="Unsuccessful solvers"
							solvers={unsuccessfulSolversData}
						/>
					)}
				</>
			)}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					columnGap: 1,
					mt: 2
				}}
			>
				<Button
					variant="contained"
					sx={{ backgroundColor: 'primary.light', maxWidth: '200px' }}
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
				<Stack direction="row" gap={2}>
					{state === RiddleStatus.Solved && (
						<Button
							variant="contained"
							sx={{ maxWidth: '200px' }}
							onClick={() => {
								deleteUserRiddleInfo(linkId, user?.email ?? '').then(
									() => navigate(0) // Refreshing the page
								);
							}}
						>
							Reset
						</Button>
					)}
					<Button
						variant="contained"
						sx={{ maxWidth: '200px' }}
						onClick={() => {
							navigate(`/riddle-detail/${linkId}/solve`);
						}}
					>
						{state === RiddleStatus.Untouched && 'Try to solve'}
						{state === RiddleStatus.Unfinished && 'Continue solving'}
						{state === RiddleStatus.Solved && 'See answers'}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};
