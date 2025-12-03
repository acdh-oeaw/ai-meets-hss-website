import { createConfig } from "@acdh-oeaw/content-lib";

import { events } from "@/lib/content/collections/events";
import { pages } from "@/lib/content/collections/pages";
import { indexPage } from "@/lib/content/singletons/index-page";
import { navigation } from "@/lib/content/singletons/navigation";

export const config = createConfig({
	collections: [pages.en, events.en, indexPage.en, navigation.en],
});
