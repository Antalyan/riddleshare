import type { FC } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { CircleFlag } from 'react-circle-flags';
import { Controller, type Control } from 'react-hook-form';

import { Countries } from '../../../utils/CountryCodes';

type Props = {
	control: Control<any>;
	label: string;
	name: string;
};

export const AutocompleteLanguages: FC<Props> = ({ control, label, name }) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => {
			const { onChange, value, ref } = field;
			return (
				<Autocomplete
					value={[...Countries].find(country => value === country.code)}
					options={[...Countries]}
					getOptionLabel={option => option.language}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onChange={(event, newValue) => {
						onChange(newValue ? newValue.code : null);
					}}
					renderOption={(props, option) => (
						<Box
							component="li"
							sx={{
								'& > img': { mr: 1 }
							}}
							{...props}
						>
							<CircleFlag countryCode={option.code} height="20" />
							{option.language}
						</Box>
					)}
					renderInput={params => (
						<TextField
							{...params}
							label={label}
							inputRef={ref}
							InputProps={{
								...params.InputProps,
								startAdornment: <CircleFlag countryCode={value} height="20" />
							}}
						/>
					)}
				/>
			);
		}}
	/>
);
