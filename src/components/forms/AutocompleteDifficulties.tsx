import { Box } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';

import type { Difficulty } from '../../utils/Difficulty.ts';
import { Difficulties } from '../../utils/Difficulty.ts';

import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent.tsx';

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
					height="25"
				>
					<LensIcon color="disabled" sx={{ color: option.color }} />
					{getOptionLabel(option)}
				</Box>
			)
		}}
	/>
);
