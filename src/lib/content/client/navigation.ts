import type en from "@content/en-navigation";

import type { SingletonClient } from "@/lib/content/types";
import { getLinkProps } from "@/lib/content/utils/get-link-props";
import type { IntlLanguage } from "@/lib/i18n/locales";
import type {
	NavigationLink,
	NavigationMenu,
	NavigationSeparator,
} from "@/lib/navigation/navigation";

// oxlint-disable-next-line typescript/explicit-module-boundary-types
export async function createClient(locale: IntlLanguage) {
	const singleton = await import(`@content/${locale}-navigation/index.js`).then((module) => {
		// oxlint-disable-next-line typescript/no-unsafe-member-access
		return module.default as typeof en;
	});

	const items = singleton.get("")!.document.links;

	const navigation = Object.fromEntries(
		items
			.map((item) => {
				switch (item.discriminant) {
					case "link": {
						const link: NavigationLink = {
							type: "link",
							href: getLinkProps(item.value.link).href,
							label: item.value.label,
						};

						return link;
					}

					case "menu": {
						const menu: NavigationMenu = {
							type: "menu",
							label: item.value.label,
							children: Object.fromEntries(
								item.value.items
									.map((item) => {
										switch (item.discriminant) {
											case "link": {
												const link: NavigationLink = {
													type: "link",
													...getLinkProps(item.value.link),
													label: item.value.label,
												};

												return link;
											}

											case "separator": {
												const separator: NavigationSeparator = {
													type: "separator",
												};

												return separator;
											}
										}
									})
									.map((item, index) => {
										return [`item-${String(index)}`, item];
									}),
							),
						};

						return menu;
					}

					case "separator": {
						const separator: NavigationSeparator = {
							type: "separator",
						};

						return separator;
					}
				}
			})
			.map((item, index) => {
				return [`item-${String(index)}`, item];
			}),
	);

	const client = {
		get() {
			return Promise.resolve(navigation);
		},
		// oxlint-disable-next-line typescript/no-explicit-any
	} satisfies SingletonClient<any>;

	return client;
}

export type IndexPage =
	Awaited<ReturnType<typeof createClient>> extends SingletonClient<infer T> ? T : never;
