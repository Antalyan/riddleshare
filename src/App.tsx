import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Header } from './components/Header.tsx';
import { PublicRiddlesPage } from './pages/PublicRiddlesPage.tsx';
import { ReceivedRiddlesPage } from './pages/ReceivedRiddlesPage.tsx';
import { MyRiddlesPage } from './pages/MyRiddlesPage.tsx';
import { theme } from './theme.ts';

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
						justifyContent: 'center'
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
