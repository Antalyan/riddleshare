import { useEffect, useState } from 'react';

import { fetchRiddleSolvers } from '../datastore/fetchingQueries';
import type { UserRiddleInfoDb } from '../utils/DbTypes';
import { RiddleStatus } from '../utils/Statuses';

export const useRiddleSolversDataFetch = (
	linkId: string,
	isCreatorView: boolean
) => {
	const [successfulSolversData, setSuccessfulSolversData] = useState<
		UserRiddleInfoDb[]
	>([]);
	const [unsuccessfulSolversData, setUnsuccessfulSolversData] = useState<
		UserRiddleInfoDb[]
	>([]);
	useEffect(() => {
		if (!isCreatorView) {
			return;
		}
		const fetchSolvers = async () => {
			const solvers = await fetchRiddleSolvers(linkId);
			const successfulSolvers: UserRiddleInfoDb[] = [];
			const unsuccessfulSolvers: UserRiddleInfoDb[] = [];
			solvers
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
		};
		fetchSolvers();
	}, []);

	return { successfulSolversData, unsuccessfulSolversData };
};
