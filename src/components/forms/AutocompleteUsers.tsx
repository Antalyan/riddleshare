import { MockUsers } from '../../../mock-data/MockData';

import { AutocompleteFormComponent } from './generic/AutocompleteFormComponent';

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
				},
				'maxWidth': { xs: 300, md: 500 }
			}
		}}
	/>
);
