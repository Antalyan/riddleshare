import { createTheme } from '@mui/material';
import { deepOrange, red } from '@mui/material/colors';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#001233'
		},
		primary: {
			main: deepOrange[500] //TODO: replace
		},
		secondary: {
			main: red[400]
		},
		text: {
			// TODO
		}
	},
	typography: {
		fontFamily: ['"Baloo 2"', 'Roboto'].join(', ')
	}
});
