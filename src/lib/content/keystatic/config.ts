import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import { config as createConfig } from "@keystatic/core";

import { createEvents } from "@/lib/content/keystatic/collections/events";
import { createPages } from "@/lib/content/keystatic/collections/pages";
import { createIndexPage } from "@/lib/content/keystatic/singletons/index-page";
import { createMetadata } from "@/lib/content/keystatic/singletons/metadata";
import { createNavigation } from "@/lib/content/keystatic/singletons/navigation";

export const config = createConfig({
	collections: {
		[withI18nPrefix("pages", "en")]: createPages("en"),
		[withI18nPrefix("events", "en")]: createEvents("en"),
	},
	singletons: {
		[withI18nPrefix("index-page", "en")]: createIndexPage("en"),
		[withI18nPrefix("metadata", "en")]: createMetadata("en"),
		[withI18nPrefix("navigation", "en")]: createNavigation("en"),
	},
	storage: {
		kind: "local",
	},
	ui: {
		brand: {
			name: "ACDH Website",
		},
		navigation: {
			Pages: [
				withI18nPrefix("index-page", "en"),
				withI18nPrefix("pages", "en"),
				withI18nPrefix("events", "en"),
			],
			Settings: [withI18nPrefix("navigation", "en"), withI18nPrefix("metadata", "en")],
		},
	},
});
