import type { AutocompleteElementProps } from 'react-hook-form-mui';
import { AutocompleteElement } from 'react-hook-form-mui';
import type { SvgIconComponent } from '@mui/icons-material';
import type { ReactElement } from 'react';

type Props<T> = AutocompleteElementProps<
	T,
	any,
	boolean | undefined,
	boolean | undefined
>;

export const AutocompleteFormComponent = <T,>(props: Props<T>) => (
	<AutocompleteElement
		{...props}
		textFieldProps={{
			placeholder: 'Some placeholder',
			sx: {
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: 'secondary',
						borderWidth: 2,
						color: 'secondary'
					}
				}
			}
		}}
		autocompleteProps={{
			sx: {
				'& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
					backgroundColor: 'red'
				}
			}
		}}
	/>
);
