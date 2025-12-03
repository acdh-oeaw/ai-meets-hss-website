import { getIntlLanguage, type IntlLocale } from "@/lib/i18n/locales";
import type metadata from "~/content/en/metadata/index.json";
import type messages from "~/messages/en.json";

type Messages = typeof messages;
type Metadata = typeof metadata;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getIntlMessages(locale: IntlLocale) {
	const language = getIntlLanguage(locale);

	const _messages = (await import(`../../../messages/${language}.json`)) as Messages;
	const _metadata = (await import(`../../../content/${language}/metadata/index.json`)) as Metadata;

	const messages = {
		..._messages,
		metadata: {
			..._metadata,
		},
	};

	return messages;
}

export type IntlMessages = Awaited<ReturnType<typeof getIntlMessages>>;
