import { Box, Button, Paper, Typography } from '@mui/material';
import type { FormEvent } from 'react';
import { useEffect, useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { FormTextField } from '../components/forms/common/FormTextField';
import { signIn, signUp } from '../datastore/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

export const LoginPage = () => {
	const navigate = useNavigate();
	const user = useLoggedInUser();

	if (user) {
		return <Navigate to="/" replace />;
	}

	const [isSignUp, setSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp
						? await signUp(email, password)
						: await signIn(email, password);
					navigate('/');
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error'
					);
				}
			}}
			sx={{
				alignSelf: 'center',
				justifySelf: 'center',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				maxWidth: '600px',
				p: 4,
				gap: 2,
				backgroundColor: 'background.default'
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Login
			</Typography>
			<FormTextField
				label="Email"
				onChange={useCallback(e => setEmail(e.target.value), [])}
				value={email}
				type="email"
			/>
			<FormTextField
				label="Password"
				onChange={useCallback(e => setPassword(e.target.value), [])}
				value={password}
				type="password"
			/>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="body1"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				<Button
					type="submit"
					variant="contained"
					onClick={() => setSignUp(false)}
				>
					Log in
				</Button>
				<Button
					type="submit"
					variant="outlined"
					onClick={() => setSignUp(true)}
				>
					Sign up
				</Button>
			</Box>
		</Paper>
	);
};
