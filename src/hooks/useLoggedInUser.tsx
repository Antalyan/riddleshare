import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

import { onAuthChanged } from '../firebase';

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	// Hold user info in state
	const [user, setUser] = useState<User>(
		sessionStorage.getItem('user')
			? JSON.parse(sessionStorage.getItem('user'))
			: undefined
	);

	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged(u => {
			setUser(u ?? undefined);
			if (u) {
				sessionStorage.setItem('user', JSON.stringify(u));
			}
		});
	}, []);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook providing logged in user information
const useLoggedInUser = () => useContext(UserContext);

export default useLoggedInUser;
