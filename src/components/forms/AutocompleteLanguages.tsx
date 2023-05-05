import { Box } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';
import { AutocompleteElement } from 'react-hook-form-mui';

import { CountryCodes } from '../../utils/CountryCodes';

export const AutocompleteLanguages = () => (
	<AutocompleteElement
		name="languages"
		// required
		label="Language"
		options={[...CountryCodes]}
		autocompleteProps={{
			renderOption: (props, option) => (
				<Box
					component="li"
					sx={{
						'& > img': { mr: 1 }
					}}
					{...props}
				>
					<CircleFlag countryCode={option} height="20" />
					{option}
				</Box>
			)
		}}
		textFieldProps={{
			InputProps: {
				// TODO: make image changed based on value
				startAdornment: <CircleFlag countryCode="gb" height={20} />
			}
		}}
	/>
);
