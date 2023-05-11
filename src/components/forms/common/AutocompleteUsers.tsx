import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';

import { fetchUsers } from '../../../datastore/fetchingFunctions';
import type { UserDb } from '../../../utils/DbTypes';
import useLoggedInUser from '../../../hooks/useLoggedInUser';

type Props = {
	control: Control<any>;
	label: string;
	name: string;
};

export const AutocompleteUsers: FC<Props> = ({ control, label, name }) => {
	const [open, setOpen] = useState(false);
	const [users, setUsers] = useState<readonly UserDb[]>([]);
	const loading = open && users.length === 0;
	const loggedInUser = useLoggedInUser();

	const loadUsers = useCallback(async () => {
		const usersData = await fetchUsers();
		setUsers(
			usersData.docs
				.map(doc => doc.data())
				.filter(user => user.email !== loggedInUser?.email)
		);
	}, []);

	useEffect(() => {
		if (!loading) {
			return undefined;
		}
		loadUsers();
	}, [loading]);

	if (!users) {
		return null;
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const { onChange, ref } = field;
				return (
					<Autocomplete
						multiple
						open={open}
						onOpen={() => {
							setOpen(true);
						}}
						onClose={() => {
							setOpen(false);
						}}
						loading={loading}
						options={users}
						getOptionLabel={user => user.email}
						onChange={(_, newValue) => {
							onChange(newValue ? newValue.map(user => user.email) : null);
						}}
						renderInput={params => (
							<TextField
								{...params}
								label={label}
								inputRef={ref}
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<>
											{loading ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</>
									)
								}}
							/>
						)}
					/>
				);
			}}
		/>
	);
};
