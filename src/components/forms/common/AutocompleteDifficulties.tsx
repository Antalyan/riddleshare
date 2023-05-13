import type { FC } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';
import { Controller, type Control } from 'react-hook-form';

import { Difficulties, type Difficulty } from '../../../utils/Difficulty';

type Props = {
	control: Control<any>;
	label: string;
	name: string;
};

const getColor = (value: number) =>
	[...Difficulties].find(difficulty => value === difficulty.value)?.color;

const getOptionLabel = (option: Difficulty) =>
	`${option.name} (${option.value}/${Difficulties.length})`;

export const AutocompleteDifficulties: FC<Props> = ({
	control,
	label,
	name
}) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => {
			const { onChange, value, ref } = field;
			return (
				<Autocomplete
					value={[...Difficulties].find(
						difficulty => value === difficulty.value
					)}
					options={[...Difficulties]}
					getOptionLabel={option => getOptionLabel(option)}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onChange={(event, newValue) => {
						onChange(newValue ? newValue.value : null);
					}}
					renderOption={(props, option: Difficulty) => (
						<Box
							component="li"
							sx={{
								'& > svg': { mr: 1 }
							}}
							{...props}
						>
							<LensIcon color="disabled" sx={{ color: option.color }} />
							{getOptionLabel(option)}
						</Box>
					)}
					renderInput={params => (
						<TextField
							{...params}
							label={label}
							inputRef={ref}
							InputProps={{
								...params.InputProps,
								startAdornment: (
									<LensIcon color="disabled" sx={{ color: getColor(value) }} />
								)
							}}
						/>
					)}
				/>
			);
		}}
	/>
);
