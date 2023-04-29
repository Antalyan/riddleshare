import { createTheme } from '@mui/material';
import { deepOrange, red } from '@mui/material/colors';

export const theme = createTheme({
	// palette: {
	// 	mode: 'dark',
	// 	background: {
	// 		default: '#001233'
	// 	},
	// 	primary: {
	// 		main: '#ff595a'
	// 	},
	// 	secondary: {
	// 		main: red[400]
	// 	},
	// 	text: {
	// 		// TODO
	// 	}
	// },
	palette: {
		mode: 'dark',
		background: {
			default: '#001233'
		},
		primary: {
			light: '#ef9293',
			main: '#ff595a'
		},
		secondary: {
			main: '#cac0b3'
		},
		text: {
			primary: '#ffffff',
			secondary: '#000000'
		}
	},
	typography: {
		fontFamily: ['"Baloo 2"', 'Roboto'].join(', ')
	}
});
