import { TextField } from '@mui/material';
import type { ChangeEvent, FC } from 'react';

type FormTextFieldProps = {
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	type: string;
	value: string;
};

export const FormTextField: FC<FormTextFieldProps> = ({
	label,
	onChange,
	type,
	value
}) => (
	<TextField
		color="secondary"
		focused
		label={label}
		onChange={onChange}
		value={value}
		type={type}
		sx={{
			backgroundColor: 'background.default',
			color: 'text.main'
		}}
	/>
);
