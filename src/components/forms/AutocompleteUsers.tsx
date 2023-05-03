import { AutocompleteElement } from 'react-hook-form-mui';

import { MockUsers } from '../../../mock-data/MockData';

export const AutocompleteUsers = () => (
	<AutocompleteElement
		name="users"
		required
		multiple
		label="Users to share with"
		options={[...MockUsers]}
		autocompleteProps={{
			sx: {
				'& .MuiAutocomplete-tag': {
					backgroundColor: 'primary.light',
					color: 'text.secondary'
				},
				'& .MuiAutocomplete-tagContainer': {
					display: 'flex',
					flexWrap: 'wrap'
				},
				'& .MuiChip-deleteIcon': {
					'color': 'background.default',
					'&:hover': {
						color: '#172745' // TODO: background.light
					}
				}
			}
		}}
	/>
);
