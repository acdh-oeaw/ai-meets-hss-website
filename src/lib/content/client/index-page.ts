import type en from "@content/en-index-page";

import type { SingletonClient } from "@/lib/content/types";
import type { IntlLanguage } from "@/lib/i18n/locales";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export async function createClient(locale: IntlLanguage) {
	const singleton = await import(`@content/${locale}-index-page/index.js`).then((module) => {
		// oxlint-disable-next-line typescript/no-unsafe-member-access
		return module.default as typeof en;
	});

	const item = singleton.get("")!.document;

	const client = {
		get() {
			return Promise.resolve(item);
		},
		// oxlint-disable-next-line typescript/no-explicit-any
	} satisfies SingletonClient<any>;

	return client;
}

export type IndexPage =
	Awaited<ReturnType<typeof createClient>> extends SingletonClient<infer T> ? T : never;
