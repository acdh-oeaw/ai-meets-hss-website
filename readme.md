# AI meets HSS

website for the AImeetsHSS conference.

## Local content editing

Install dependencies with `pnpm install` and copy `.env.local.example` to `.env.local`. Run
`pnpm dev`, then open <http://localhost:3000/keystatic> to edit content. Keystatic saves changes to
the local content files; commit those changes to publish them through the deployment workflow. If
`PUBLIC_APP_BASE_PATH` is set, prefix the editor URL with that path.

## Static deployment

`pnpm build` generates the static website in `dist/`. The Keystatic editor and API are enabled only
by `astro dev` and are excluded from production builds. The Dockerfile builds the website with Node
and serves the generated files using Caddy on port 3000. Content updates require a new build and
deployment.

The runtime uses an unprivileged Caddy user and the configuration in `Caddyfile`. Compression is
handled by the Kubernetes Traefik middleware. CI restores Astro's assets cache before building, then
exports the updated cache using the Dockerfile's `astro-cache` target so subsequent builds can reuse
optimized images and fonts.

The Docker build context uses an allowlist in `.dockerignore`; add new build inputs there when
needed. Documentation, tests, local environment files, and development metadata are excluded. Caddy
configuration is copied separately so changing it does not rebuild the application. Docker uses the
base image's Node installation; pnpm's runtime management remains enabled for local development.

Hero images use responsive WebP variants capped at 1920 pixels; programme cards use smaller
responsive thumbnails. The build removes unreferenced images from `dist/assets/content/` and
`dist/_astro/`, preserving referenced images and non-image downloads. Source files in `public/`
remain available for local editing and future builds.
