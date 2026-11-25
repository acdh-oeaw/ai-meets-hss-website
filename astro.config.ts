import * as path from "node:path";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";

import { defaultLocale } from "./src/lib/i18n/locales";
import { localeToPrefix } from "./src/lib/i18n/routing";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
	output: "static",
	base: env.PUBLIC_APP_BASE_PATH,
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--_font-body",
			weights: ["100 900"],
		},
	],
	integrations: [
		// The editor and its filesystem API exist only in the local development server.
		...(process.env.NODE_ENV === "development" ? [react(), keystatic()] : []),
		icon({
			iconDir: "./src/assets/icons",
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: ["chevron-down", "globe", "mail", "menu"],
			},
			svgoOptions: {
				multipass: true,
				plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
			},
		}),
		/**
		 * Even though we are using our own mdx processing pipeline, the astro mdx integration is
		 * required. Not entirely sure why, but probably because it disables the built-in astro-jsx
		 * plugin.
		 */
		mdx(),
		svelte({
			exclude: ["**/keystatic/**"],
		}),
		sitemap({
			i18n: {
				locales: localeToPrefix,
				defaultLocale,
			},
		}),
	],
	security: {
		allowedDomains: env.PUBLIC_APP_BASE_URL
			? [{ hostname: new URL(env.PUBLIC_APP_BASE_URL).hostname }]
			: [],
	},
	server: {
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL!,
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@content": path.resolve(".content/generated"),
			},
		},
		server: {
			watch: {
				ignored: ["content/**"],
			},
		},
	},
});
