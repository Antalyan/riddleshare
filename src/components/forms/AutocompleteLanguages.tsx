import { Box } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';

import { CountryCodes } from '../../utils/CountryCodes.ts';

import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent.tsx';

export const AutocompleteLanguages = () => (
	<AutocompleteFormComponent
		name="languages"
		required
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
					height="25"
				>
					<CircleFlag countryCode={option} height="20" />
					{option}
				</Box>
			)
		}}
	/>
);
