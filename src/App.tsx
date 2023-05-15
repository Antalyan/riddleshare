import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { PublicRiddlesPage } from './pages/PublicRiddlesPage';
import { ReceivedRiddlesPage } from './pages/ReceivedRiddlesPage';
import { MyRiddlesPage } from './pages/MyRiddlesPage';
import { theme } from './theme';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './utils/PrivateRoute';
import { UserProvider } from './hooks/useLoggedInUser';
import { CreateRiddlePage } from './pages/CreateRiddlePage';
import RiddleDetailPage from './pages/RiddleDetailPage';
import { NavigationBar } from './components/navigation/NavigationBar';
import { RiddleSolvingPage } from './pages/RiddleSolvingPage';
import { UpdateRiddlePage } from './pages/UpdateRiddlePage';

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
						display: 'grid',
						flexDirection: 'column',
						flexGrow: 1,
						gap: 2,
						py: { xs: '16px', md: '32px' }
					}}
				>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/riddle-detail/:id"
							element={
								<PrivateRoute>
									<RiddleDetailPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/riddle-detail/:id/solve"
							element={
								<PrivateRoute>
									<RiddleSolvingPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/riddle-detail/:id/edit"
							element={
								<PrivateRoute>
									<UpdateRiddlePage />
								</PrivateRoute>
							}
						/>
						<Route path="/public-riddles" element={<PublicRiddlesPage />} />
						<Route
							path="/received-riddles"
							element={
								<PrivateRoute>
									<ReceivedRiddlesPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/my-riddles"
							element={
								<PrivateRoute>
									<MyRiddlesPage />
								</PrivateRoute>
							}
						/>
						<Route
							path="/create-riddle"
							element={
								<PrivateRoute>
									<CreateRiddlePage />
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
