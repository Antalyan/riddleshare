import type { RadioButtonGroupProps } from 'react-hook-form-mui';
import { RadioButtonGroup } from 'react-hook-form-mui';

type Props<T> = RadioButtonGroupProps<T>;

export const RadioButtonFormComponent = <T,>(props: Props<T>) => (
	<RadioButtonGroup
		{...props}
		row
		labelProps={{
			sx: {
				'& .MuiRadio-root': {
					color: 'primary.main'
				},
				'&': {
					display: 'block',
					width: '40%'
				}
			}
		}}
	/>
);
