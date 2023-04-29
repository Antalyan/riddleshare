export const CountryCodes = ['de', 'es', 'fr', 'cz', 'it', 'sk', 'uk'] as const;

export type CountryCode = (typeof CountryCodes)[number];

// TODO: Move to English localization
// const EnglishNames = [
// 	'German',
// 	'Spanish',
// 	'French',
// 	'Czech',
// 	'Italian',
// 	'Slovak',
// 	'English'
// ];
