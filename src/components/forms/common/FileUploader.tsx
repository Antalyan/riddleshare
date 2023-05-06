import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore TODO: fix import errors
import { MuiFileInput } from 'mui-file-input';

type Props = {
	name: string;
	control: Control<any>;
	label?: string;
};

export const FileUploader = ({ name, control, label }: Props) => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState }) => (
			<MuiFileInput
				{...field}
				label={label}
				accept="image/*"
				ref={null} // to prevent console warning 'Function components cannot be given refs. Attempts to access this ref will fail.'
				helperText={fieldState.invalid ? 'File is invalid' : ''}
				error={fieldState.invalid}
			/>
		)}
	/>
);
