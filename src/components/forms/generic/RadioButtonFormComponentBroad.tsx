import type { ChangeEvent } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { FormControlLabelProps } from '@mui/material';
import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup
} from '@mui/material';
import { useFormError } from 'react-hook-form-mui';

export type RadioButtonGroupProps<T extends FieldValues> = {
	options: { label: string; id: string | number }[] | any[];
	helperText?: string;
	name: Path<T>;
	required?: boolean;
	parseError?: (error: FieldError) => string;
	label?: string;
	labelKey?: string;
	valueKey?: string;
	type?: 'number' | 'string';
	emptyOptionLabel?: string;
	onChange?: (value: any) => void;
	returnObject?: boolean;
	row?: boolean;
	control?: Control<T>;
	labelProps?: Omit<FormControlLabelProps, 'label' | 'control' | 'value'>;
	disabled?: boolean;
};

export const RadioButtonFormComponentBroad = <
	TFieldValues extends FieldValues
>({
	helperText,
	options,
	label,
	name,
	parseError,
	labelKey = 'label',
	valueKey = 'id',
	required,
	emptyOptionLabel,
	returnObject,
	control,
	type,
	labelProps,
	disabled,
	...rest
}: RadioButtonGroupProps<TFieldValues>): JSX.Element => {
	const errorMsgFn = useFormError();
	const customErrorFn = parseError ?? errorMsgFn;
	const {
		field: { value, onChange },
		fieldState: { error }
	} = useController({
		name,
		rules: required ? { required: 'This field is required' } : undefined,
		control
	});

	helperText = error
		? typeof customErrorFn === 'function'
			? customErrorFn(error)
			: error.message
		: helperText;

	const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		const radioValue = (event.target as HTMLInputElement).value;
		const returnValue = returnObject
			? options.find(items => items[valueKey] === radioValue)
			: radioValue;
		// setValue(name, returnValue, { shouldValidate: true })
		onChange(returnValue);
		if (typeof rest.onChange === 'function') {
			rest.onChange(returnValue);
		}
	};

	return (
		<FormControl error={!!error}>
			{label && (
				// We could remove theme modification with this component as color can be adjusted here
				<FormLabel
					required={required}
					error={!!error}
					sx={{ color: 'text.primary', p: 2 }}
				>
					{label}
				</FormLabel>
			)}
			<RadioGroup
				onChange={onRadioChange}
				name={name}
				row
				value={value || ''}
				sx={{
					p: 2,
					border: 2,
					borderColor: 'secondary', //TODO: adjust colors on focus and hover
					borderRadius: 3
				}}
			>
				{emptyOptionLabel && (
					<FormControlLabel
						{...labelProps}
						sx={{
							'& .MuiRadio-root': {
								color: 'primary.main'
							}
						}}
						control={<Radio checked={!value} />}
						label={emptyOptionLabel}
						value=""
					/>
				)}
				{options.map((option: any) => {
					const optionKey = option[valueKey];
					if (!optionKey) {
						console.error(
							`CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
							option
						);
					}
					let val = returnObject ? value[valueKey] : value;
					if (type === 'number') {
						val = Number(val);
					}
					const isChecked = val === optionKey;
					return (
						<FormControlLabel
							{...labelProps}
							sx={{
								'& .MuiRadio-root': {
									color: 'primary.main'
								}
							}}
							control={<Radio disabled={disabled} checked={isChecked} />}
							value={optionKey}
							label={option[labelKey]}
							key={optionKey}
						/>
					);
				})}
			</RadioGroup>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};
