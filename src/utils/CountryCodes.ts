export const Countries = [
	{ code: 'cz', language: 'Czech' },
	{ code: 'de', language: 'German' },
	{ code: 'es', language: 'Spanish' },
	{ code: 'fr', language: 'French' },
	{ code: 'it', language: 'Italian' },
	{ code: 'sk', language: 'Slovak' },
	{ code: 'uk', language: 'English' }
] as const;

export type CountryCode = (typeof Countries)[number]['code'];

export const getLanguage = (countryCode: CountryCode): string => {
	const language = Countries.find(
		country => country.code === countryCode
	)?.language;
	if (!language) {
		throw new Error(`Invalid country code ${countryCode} provided.`);
	}
	return language;
};
