import { Box } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';

import type { Difficulty } from '../../utils/Difficulty';
import { Difficulties } from '../../utils/Difficulty';

import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent';

const getOptionLabel = (option: Difficulty) =>
	`${option.name} (${option.value}/${Difficulties.length})`;

export const AutocompleteDifficulties = () => (
	<AutocompleteFormComponent
		name="difficulties"
		required
		label="Expected difficulty"
		options={[...Difficulties]}
		autocompleteProps={{
			getOptionLabel,
			renderOption: (props, option: Difficulty) => (
				<Box
					component="li"
					sx={{
						'& > svg': { mr: 1 }
					}}
					{...props}
				>
					<LensIcon color="disabled" sx={{ color: option.color }} />
					{getOptionLabel(option)}
				</Box>
			)
		}}
		textFieldProps={{
			InputProps: {
				startAdornment: <LensIcon color="disabled" sx={{ color: '#4caf50' }} />
			}
		}}
	/>
);
