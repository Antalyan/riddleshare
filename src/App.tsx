import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { Header } from './components/Header';
import { PublicRiddlesPage } from './pages/PublicRiddlesPage';
import { ReceivedRiddlesPage } from './pages/ReceivedRiddlesPage';
import { MyRiddlesPage } from './pages/MyRiddlesPage';
import { theme } from './theme';

export const App = () => {
	const x = 'RIDDLESHARE';

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Header />
				<Container
					maxWidth="md"
					component="main"
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						gap: 2,
						justifyContent: 'center',
						mb: 2
					}}
				>
					{x}
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/my-riddles" element={<MyRiddlesPage />} />
						<Route path="/public-riddles" element={<PublicRiddlesPage />} />
						<Route path="/received-riddles" element={<ReceivedRiddlesPage />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</ThemeProvider>
	);
};
