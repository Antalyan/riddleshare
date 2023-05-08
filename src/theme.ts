import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface ButtonPropsVariantOverrides {
		dashed: true;
	}
}

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface TypeBackground {
		light: string;
	}
}

const globalTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#001233',
			light: '#172745'
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

export const theme = createTheme(
	{
		components: {
			MuiAccordion: {
				styleOverrides: {
					root: {
						backgroundColor: globalTheme.palette.background.default,
						borderStyle: 'solid',
						borderWidth: '2px',
						borderRadius: 8,
						borderColor: 'rgba(255, 255, 255, 0.23)',
						margin: '0px !important'
					}
				}
			},
			MuiAutocomplete: {
				styleOverrides: {
					listbox: {
						backgroundColor: globalTheme.palette.background.light,
						overflow: 'auto'
					}
				}
			},
			MuiBackdrop: {
				styleOverrides: {
					root: {
						backgroundColor: 'rgba(0, 0, 0, 0.75)'
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						fontSize: '1rem',
						fontWeight: 'bold',
						textTransform: 'none'
					},
					outlined: {
						color: '#ffffff'
					},
					contained: {
						color: '#000000'
					}
				},
				variants: [
					{
						props: { variant: 'dashed' },
						style: {
							borderWidth: '2px',
							borderStyle: 'dashed',
							borderColor: globalTheme.palette.primary.main
						}
					}
				]
			},
			MuiChip: {
				styleOverrides: {
					icon: {
						marginLeft: 0,
						maxHeight: '100%'
					},
					label: {
						padding: 0
					},
					root: {
						gap: '16px',
						padding: '4px 12px',
						fontSize: '1rem'
					}
				}
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						backgroundColor: globalTheme.palette.background.light,
						width: '400px'
					}
				}
			},
			MuiFormGroup: {
				styleOverrides: {
					root: {
						'padding': '16.5px 14px',
						'borderStyle': 'solid',
						'borderWidth': '2px',
						'borderRadius': 8,
						'borderColor': 'rgba(255, 255, 255, 0.23)',
						'&:hover': {
							borderColor: globalTheme.palette.secondary.main
						}
					}
				}
			},
			MuiFormLabel: {
				styleOverrides: {
					root: {
						color: globalTheme.palette.text.primary // should be '#ffffff' by default
					}
				}
			},
			MuiIconButton: {
				styleOverrides: {
					root: {
						justifyContent: 'center',
						alignContent: 'center',
						color: globalTheme.palette.primary.main
					}
				}
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: globalTheme.palette.text.primary // should be '#ffffff' by default
					}
				}
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						'& fieldset': {
							borderColor: 'secondary',
							borderRadius: 8,
							borderWidth: 2,
							color: globalTheme.palette.text.primary // should be '#ffffff' by default
						}
					}
					// input: {
					// 	'backgroundColor': globalTheme.palette.background.light,
					// 	'&:-webkit-autofill': {
					// 		'-webkit-box-shadow': `0 0 0 100px ${globalTheme.palette.background.light} inset`
					// 	}
					// }
				}
			},
			MuiRadio: {
				styleOverrides: {
					root: {
						color: globalTheme.palette.primary.main,
						padding: 0,
						paddingRight: 8
					}
				}
			},
			MuiStepLabel: {
				styleOverrides: {
					label: {
						color: globalTheme.palette.text.primary
					}
				}
			}
		}
	},
	globalTheme
);
