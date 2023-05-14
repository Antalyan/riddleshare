import type { RiddleDisplayDetailSimple } from './Types';

export const testRiddleExistenceAndPermissions = (
	riddle: RiddleDisplayDetailSimple | undefined,
	userEmail: string
) => {
	if (
		!riddle ||
		(riddle.sharingInformation.visibility === 'private' &&
			!riddle.sharingInformation.sharedUsers?.includes(userEmail) &&
			riddle.creatorEmail !== userEmail)
	) {
		window.location.replace('/not-found');
	}
};
