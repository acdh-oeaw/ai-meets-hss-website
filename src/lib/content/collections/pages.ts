import path from "node:path";

import { createCollection } from "@acdh-oeaw/content-lib";
import { withI18nPrefix } from "@acdh-oeaw/keystatic-lib";
import type { ImageMetadata } from "astro";
import type { MDXContent } from "mdx/types";
import { VFile } from "vfile";

import { reader } from "@/lib/content/keystatic/reader";
import { compile, type CompileOptions } from "@/lib/content/mdx/compile";
import {
	createCustomHeadingIdsPlugin,
	createHeadingIdsPlugin,
	createImageImportsPlugin,
} from "@/lib/content/mdx/rehype-plugins";
import {
	createGitHubMarkdownPlugin,
	createTypographicQuotesPlugin,
} from "@/lib/content/mdx/remark-plugins";
import { getIntlLanguage, type IntlLocale } from "@/lib/i18n/locales";

const publicPath = "../../../public/";

function createPagesCollection<TLocale extends IntlLocale>(locale: TLocale) {
	const language = getIntlLanguage(locale);
	const collection = withI18nPrefix("pages", language);

	const compileOptions: CompileOptions = {
		remarkPlugins: [createGitHubMarkdownPlugin(), createTypographicQuotesPlugin(language)],
		rehypePlugins: [
			createCustomHeadingIdsPlugin(),
			createHeadingIdsPlugin(),
			createImageImportsPlugin([], publicPath),
		],
	};

	return createCollection({
		name: collection,
		directory: `./content/${language}/pages/`,
		include: ["*/index.mdx"],
		read(item) {
			return reader.collections[collection].readOrThrow(item.id, { resolveLinkedFiles: true });
		},
		async transform(data, item, context) {
			const { content, image: _image, ...metadata } = data;

			const input = new VFile({ path: item.absoluteFilePath, value: content });
			const output = await compile(input, compileOptions);
			const module = context.createJavaScriptImport<MDXContent>(String(output));
			const tableOfContents = output.data.tableOfContents ?? [];
			const src =
				// eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unnecessary-condition
				_image != null && _image.src != null
					? context.createImportDeclaration<ImageMetadata>(path.join(publicPath, _image.src))
					: null;

			return {
				id: item.id,
				content: module,
				metadata: {
					...metadata,
					image: {
						..._image,
						src,
					},
				},
				tableOfContents,
			};
		},
	});
}

export const pages = {
	en: createPagesCollection("en-GB"),
};
