import { Box } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';
import { AutocompleteElement } from 'react-hook-form-mui';

import type { Difficulty } from '../../../utils/Difficulty.ts';
import { Difficulties } from '../../../utils/Difficulty.ts';

const getOptionLabel = (option: Difficulty) =>
	`${option.name} (${option.value}/${Difficulties.length})`;

export const AutocompleteDifficulties = () => (
	<AutocompleteElement
		name="difficulty"
		// required
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
