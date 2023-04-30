import type { TextFieldElementProps } from 'react-hook-form-mui';
import { TextFieldElement } from 'react-hook-form-mui';
import type { FC } from 'react';

export const TextFieldComponent: FC<TextFieldElementProps> = (
	props: TextFieldElementProps
) => (
	<TextFieldElement
		{...props}
		margin="normal"
		sx={{
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					borderColor: 'secondary',
					borderWidth: 2,
					color: 'secondary'
				}
			}
		}}
		InputLabelProps={{
			sx: { color: 'text.primary' }
		}}
	/>
);
