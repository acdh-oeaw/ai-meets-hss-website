import type { IntlLocale } from "@/lib/i18n/locales";
import { getIntlMessages } from "@/lib/i18n/messages";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export async function getMetadata(locale: IntlLocale) {
	const { metadata } = await getIntlMessages(locale);

	return metadata;
}
