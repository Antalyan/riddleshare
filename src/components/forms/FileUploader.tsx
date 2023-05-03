import type { Control, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
// @ts-ignore TODO: fix import errors
import { MuiFileInput } from 'mui-file-input';
import { useState } from 'react';

export const useFileUploader = (name: string, label?: string) => {
	const [file, setFile] = useState<null | File>(null);
	return (
		<Controller
			name={name}
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
