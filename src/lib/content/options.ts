export const linkKinds = [
	{ label: "Pages", value: "pages" },
	{ label: "Direct URL", value: "external" },
	{ label: "Heading identifier", value: "hash" },
	{ label: "Download", value: "download" },
	{ label: "Search", value: "search" },
] as const;

export type LinkKind = (typeof linkKinds)[number]["value"];
