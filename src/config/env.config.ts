import { addTrailingSlash, removeTrailingSlash } from "@acdh-oeaw/lib";
import { createEnv, ValidationError } from "@acdh-oeaw/validate-env/astro";
import * as v from "valibot";

const environment =
	import.meta.env === undefined
		? process.env
		: import.meta.env.SSR
			? Object.assign({}, process.env, import.meta.env)
			: import.meta.env;

export const env = createEnv({
	schemas: {
		system(environment) {
			const schema = v.object({
				NODE_ENV: v.optional(v.picklist(["development", "production", "test"]), "production"),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				throw new ValidationError(
					`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
				);
			}

			return result.output;
		},
		private(environment) {
			const schema = v.object({
				CI: v.optional(v.pipe(v.unknown(), v.transform(Boolean), v.boolean())),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				throw new ValidationError(
					`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
				);
			}

			return result.output;
		},
		public(environment) {
			const schema = v.object({
				PUBLIC_APP_BASE_PATH: v.optional(
					v.pipe(v.string(), v.nonEmpty(), v.transform(removeTrailingSlash)),
				),
				PUBLIC_APP_BASE_URL: v.pipe(v.string(), v.url(), v.transform(removeTrailingSlash)),
				PUBLIC_BOTS: v.optional(v.picklist(["disabled", "enabled"]), "disabled"),
				PUBLIC_GOOGLE_SITE_VERIFICATION: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_IMPRINT_SERVICE_BASE_URL: v.pipe(
					v.string(),
					v.url(),
					v.transform(removeTrailingSlash),
				),
				PUBLIC_MATOMO_BASE_URL: v.optional(
					v.pipe(v.string(), v.url(), v.transform(addTrailingSlash)),
				),
				PUBLIC_MATOMO_ID: v.optional(
					v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
				),
				PUBLIC_REDMINE_ID: v.pipe(
					v.string(),
					v.transform(Number),
					v.number(),
					v.integer(),
					v.minValue(1),
				),
			});

			const result = v.safeParse(schema, environment);

			if (!result.success) {
				throw new ValidationError(
					`Invalid or missing environment variables.\n${v.summarize(result.issues)}`,
				);
			}

			return result.output;
		},
	},
	environment,
	validation: v.parse(
		v.optional(v.picklist(["disabled", "enabled", "public"]), "enabled"),
		environment.ENV_VALIDATION,
	),
});
