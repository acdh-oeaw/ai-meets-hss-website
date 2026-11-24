import { createClient as createLocalClient } from "@/lib/content/client";
import type { IntlLanguage } from "@/lib/i18n/locales";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export async function createClient(locale: IntlLanguage) {
	const client = await createLocalClient(locale);

	return client;
}
