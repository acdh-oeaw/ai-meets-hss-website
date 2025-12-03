import type { IntlLanguage, IntlLocale } from "@/lib/i18n/locales";

export const localeToPrefix = {
	"en-GB": "en",
} as const satisfies Record<IntlLocale, IntlLanguage>;

export const prefixToLocale = {
	en: "en-GB",
} as const satisfies Record<IntlLanguage, IntlLocale>;
