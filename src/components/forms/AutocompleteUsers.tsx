import { Box, Chip } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';

import { CountryCodes } from '../../utils/CountryCodes.ts';
import { MockUsers } from '../../../mock-data/MockData.ts';

import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent.tsx';

export const AutocompleteUsers = () => (
	<AutocompleteFormComponent
		name="users"
		required
		multiple
		label="Users to share with"
		options={[...MockUsers]}
		autocompleteProps={{
			sx: {
				'& .MuiAutocomplete-tag': {
					maxWidth: 'calc(100% - 8px)',
					backgroundColor: 'primary.light',
					color: 'text.secondary'
				},
				'& .MuiAutocomplete-tagContainer': {
					display: 'flex',
					flexWrap: 'wrap'
				}
				// 'maxWidth': 300 -- Setup maxwidth when used
			}
		}}
	/>
);
