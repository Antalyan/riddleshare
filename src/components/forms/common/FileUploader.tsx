import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TODO: fix import errors
import { MuiFileInput } from 'mui-file-input';
import type { FC } from 'react';

type Props = {
	name: string;
	control: Control<any>;
	label?: string;
};

export const FileUploader: FC<Props> = ({ name, control, label }) => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState }) => (
			<MuiFileInput
				{...field}
				error={fieldState.invalid}
				helperText={fieldState.invalid ? 'File is invalid' : ''}
				inputProps={{ accept: 'image/*' }}
				label={label}
				ref={null} // to prevent console warning 'Function components cannot be given refs. Attempts to access this ref will fail.'
			/>
		)}
	/>
);
