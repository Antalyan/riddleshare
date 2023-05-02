import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { NavigationBar } from './components/NavigationBar';
import { PublicRiddlesPage } from './pages/PublicRiddlesPage';
import { ReceivedRiddlesPage } from './pages/ReceivedRiddlesPage';
import { MyRiddlesPage } from './pages/MyRiddlesPage';
import { theme } from './theme';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './utils/PrivateRoute';
import { UserProvider } from './hooks/useLoggedInUser';
import { CreateRiddlePage } from './pages/CreateRiddlePage';

export const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<NavigationBar />
				<Container
					maxWidth="md"
					component="main"
					sx={{
						width: '100%',
						minHeight: 'calc(100vh - 64px)',
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						gap: 2,
						p: '24px',
						justifyContent: 'center'
					}}
				>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/create-riddle" element={<CreateRiddlePage />} />
						<Route path="/my-riddles" element={<MyRiddlesPage />} />
						<Route path="/public-riddles" element={<PublicRiddlesPage />} />
						<Route
							path="/my-riddles"
							element={
								<PrivateRoute>
									<MyRiddlesPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/received-riddles"
							element={
								<PrivateRoute>
									<ReceivedRiddlesPage />
								</PrivateRoute>
							}
						/>
						<Route path="/login" element={<LoginPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</ThemeProvider>
	</UserProvider>
);
