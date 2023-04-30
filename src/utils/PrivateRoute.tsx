import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();

	return user === undefined ? (
		<Navigate to="/login" replace />
	) : (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>{children}</>
	);
};
