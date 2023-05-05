import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
// @ts-ignore TODO: fix import errors
import { MuiFileInput } from 'mui-file-input';
import { useState } from 'react';

type Props = {
	name: string;
	control: Control<any>;
	label?: string;
};

//TODO: make image loading to work (value not passed via context now)
export const FileUploader = ({ name, control, label }: Props) => {
	const [file, setFile] = useState<null | File>(null);
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<MuiFileInput
					{...field}
					label={label}
					value={file}
					onChange={(newFile: File | null) => {
						setFile(newFile);
					}}
					helperText={fieldState.invalid ? 'File is invalid' : ''}
					error={fieldState.invalid}
				/>
			)}
		/>
	);
};