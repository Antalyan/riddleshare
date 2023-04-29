import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
