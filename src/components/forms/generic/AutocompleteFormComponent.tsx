import type { AutocompleteElementProps } from 'react-hook-form-mui';
import { AutocompleteElement } from 'react-hook-form-mui';
import { Paper, styled } from '@mui/material';

import { theme } from '../../../theme';

type Props<T> = AutocompleteElementProps<
	T,
	any,
	boolean | undefined,
	boolean | undefined
>;

const StyledPaper = styled(Paper)({
	'& .MuiAutocomplete-listbox': {
		backgroundColor: theme.palette.background.default,
		overflow: 'auto'
	}
});

export const AutocompleteFormComponent = <T,>(props: Props<T>) => (
	<AutocompleteElement
		{...props}
		textFieldProps={{
			...props.textFieldProps,
			placeholder: 'Some placeholder',
			sx: {
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: 'secondary',
						borderWidth: 2,
						color: 'text.primary'
					}
				},
				'& .MuiInputLabel-root': {
					color: 'text.primary'
				}
			}
			// TODO: Figure out how to get any image there
			// InputProps: {
			// 	endAdornment: (
			// 		<CircleFlag countryCode={selectedOption.value} height="20" />
			// 	)
			// }
		}}
		autocompleteProps={{
			...props.autocompleteProps,
			PaperComponent: StyledPaper
		}}
	/>
);
