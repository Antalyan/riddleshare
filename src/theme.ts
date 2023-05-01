import { createTheme } from '@mui/material';
import { deepOrange, red } from '@mui/material/colors';

export const theme = createTheme({
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

	// We could also override component style for the whole app like this:
	// components: {
	// 	MuiRadio: {
	// 		styleOverrides: {
	// 			root: {
	// 				'color': 'magenta',
	// 				'&.Mui-checked': {
	// 					color: 'yellow'
	// 				}
	// 			}
	// 		}
	// 	}
	// }
});
