## Web apps on Convex, deployed by Alchemy, in your own accounts

Samebase is a small set of open-source parts that turn a GitHub repository into a running app. You
add one secret. Every push to `main` deploys, every pull request gets its own preview, and Google
sign-in works on each of them.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/samebase/.github/main/profile/map-dark.svg">
  <img src="https://raw.githubusercontent.com/samebase/.github/main/profile/map-light.svg" alt="A push to your GitHub repository runs Alchemy in GitHub Actions. Alchemy deploys to your Convex team: production and one preview per pull request, each serving the backend and the site. The identity hub gives each deployment its own sign-in client. samebase.com reads the Alchemy state and shows what is deployed." width="100%">
</picture>

Two things are fixed. [Convex](https://convex.dev) runs the backend and serves the site, and
[Alchemy](https://alchemy.run) deploys it from one file, `alchemy.run.ts`. The rest is yours to
change. The starter's interface is React with TanStack Start today, and it is the replaceable part: an
agent can rewrite it for another framework.

### The four repositories

- **[base](https://github.com/samebase/base): start here.** The starter template. Add one secret,
  `CONVEX_ACCESS_TOKEN`, and push. About a minute later the app is live, with pull request
  previews and Google sign-in. No Samebase account.
- **[identity-hub](https://github.com/samebase/identity-hub): sign-in for every deployment.**
  Google and GitHub want each callback URL registered by hand, so a preview cannot sign in. The hub
  registers each deployment when it deploys. Use ours at `id.samebase.com`, or run your own from
  this template.
- **[convex-hosting](https://github.com/samebase/convex-hosting): one host.** A Convex component
  that serves the app's files and its server-rendered pages from the deployment that runs the
  backend.
- **[samebase](https://github.com/samebase/samebase): the dashboard and the packages.** The source
  of [samebase.com](https://samebase.com), which shows each app's URL, deployed commit, checks, and
  previews, and of the first two packages below.

### The packages

- [`@samebase/alchemy-convex`](https://github.com/samebase/samebase/tree/main/packages/alchemy-convex):
  Convex for Alchemy. Projects, deployments, environment variables, the push, and the Alchemy state
  in your own Convex team.
- [`@samebase/identity-broker`](https://www.convex.dev/components/samebase/identity-broker): an
  OpenID Provider as a Convex component. The identity hub is this package plus settings.
- [`@samebase/convex-hosting`](https://www.convex.dev/components/samebase/convex-hosting): the
  hosting component.

[samebase.com](https://samebase.com) · [Discord](https://samebase.com/discord) ·
[X](https://x.com/samebasecom)
