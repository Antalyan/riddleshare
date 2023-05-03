import type { AutocompleteElementProps } from 'react-hook-form-mui';
import { AutocompleteElement } from 'react-hook-form-mui';
import { Paper, styled } from '@mui/material';

type Props<T> = AutocompleteElementProps<
	T,
	any,
	boolean | undefined,
	boolean | undefined
>;

//TODO: Move to css and remove component
const DropdownMenu = styled(Paper)({
	'& .MuiAutocomplete-listbox': {
		backgroundColor: '#172745',
		overflow: 'auto'
	}
});

export const AutocompleteFormComponent = <T,>(props: Props<T>) => (
	<AutocompleteElement
		{...props}
		textFieldProps={{
			...props.textFieldProps
			// TODO: Figure out how to get any image there (it would be then moved to the specific components)
			// InputProps: {
			// 	endAdornment: (
			// 		<CircleFlag countryCode={selectedOption.value} height="20" />
			// 	)
			// }
		}}
		autocompleteProps={{
			...props.autocompleteProps,
			PaperComponent: DropdownMenu
		}}
	/>
);
