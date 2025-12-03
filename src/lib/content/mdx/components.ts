/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Image from "@/components/content/img.astro";
import ContentLink from "@/components/content/link.astro";
import Link from "@/components/link.astro";

export const components = {
	a: Link,
	img: Image,
	Link: ContentLink,
};

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
