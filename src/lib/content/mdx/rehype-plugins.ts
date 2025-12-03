/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { withCustomHeadingIds, withImageImports, withImageSizes } from "@acdh-oeaw/mdx-lib";
import withHeadingIds from "rehype-slug";
import type { Pluggable } from "unified";

export function createCustomHeadingIdsPlugin() {
	return withCustomHeadingIds satisfies Pluggable;
}

export function createHeadingIdsPlugin() {
	return withHeadingIds satisfies Pluggable;
}

export function createImageImportsPlugin(components?: Array<string>, publicPath?: string) {
	return [withImageImports, { components, publicPath }] satisfies Pluggable;
}

export function createImageSizesPlugin(components?: Array<string>, publicPath?: string) {
	return [withImageSizes, { components, publicPath }] satisfies Pluggable;
}
