import type { TextFieldElementProps } from 'react-hook-form-mui';
import { TextFieldElement } from 'react-hook-form-mui';
import type { FC } from 'react';

export const TextFieldFormComponent: FC<TextFieldElementProps> = (
	props: TextFieldElementProps
) => <TextFieldElement {...props} />;
