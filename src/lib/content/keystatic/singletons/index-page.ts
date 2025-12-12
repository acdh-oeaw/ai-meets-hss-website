import {
	createAssetOptions,
	createContentFieldOptions,
	createLabel,
	createSingleton,
} from "@acdh-oeaw/keystatic-lib";
import { fields, singleton } from "@keystatic/core";

export const createIndexPage = createSingleton("/index-page/", (paths, locale) => {
	return singleton({
		label: createLabel("Home page", locale),
		path: paths.contentPath,
		format: { contentField: "content" },
		entryLayout: "form",
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			subtitle: fields.text({
				label: "Subtitle",
				validation: { isRequired: true },
				multiline: true,
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetOptions(paths.assetPath),
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					...createContentFieldOptions(paths),
					codeBlock: false,
					image: false,
					table: false,
				},
				components: {},
			}),
		},
	});
});
