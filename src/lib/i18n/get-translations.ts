import { createTranslator, type NamespaceKeys, type NestedKeyOf } from "use-intl";

import type { IntlLocale } from "@/lib/i18n/locales";
import { getIntlMessages, type IntlMessages } from "@/lib/i18n/messages";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export async function getTranslations(
	locale: IntlLocale,
	namespace?: NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
) {
	const messages = await getIntlMessages(locale);

	return createTranslator({ locale, messages, namespace });
}
