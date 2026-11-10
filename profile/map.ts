// Writes the two diagrams of the organization page, map-light.svg and map-dark.svg.
//   node profile/map.ts
import { writeFileSync } from "node:fs";

const themes = {
  light: { ink: "#394447", soft: "#6b7679", line: "#394447", fill: "#ffffff", tint: "#f1f3f3" },
  dark: { ink: "#e6edf3", soft: "#9aa5ad", line: "#9aa5ad", fill: "#0d1117", tint: "#161b22" },
};

const font = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function svg(theme: (typeof themes)[keyof typeof themes]) {
  const { ink, soft, line, fill, tint } = theme;
  const box = (x: number, y: number, w: number, h: number, background = fill) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${background}" stroke="${line}" stroke-width="2"/>`;
  const title = (x: number, y: number, text: string) =>
    `<text x="${x}" y="${y}" font-family="${font}" font-size="22" font-weight="700" fill="${ink}">${text}</text>`;
  const note = (x: number, y: number, text: string) =>
    `<text x="${x}" y="${y}" font-family="${font}" font-size="17" fill="${soft}">${text}</text>`;
  const repo = (x: number, y: number, text: string) =>
    `<text x="${x}" y="${y}" font-family="${mono}" font-size="16" font-weight="700" fill="${ink}">${text}</text>`;
  const arrow = (x1: number, y1: number, x2: number, y2: number, dashed = false) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${line}" stroke-width="2" marker-end="url(#head)"${dashed ? ' stroke-dasharray="6 6"' : ""}/>`;
  const deployment = (x: number, name: string, kind: string) =>
    `${box(x, 268, 132, 76, fill)}
    <text x="${x + 66}" y="300" text-anchor="middle" font-family="${mono}" font-size="17" font-weight="700" fill="${ink}">${name}</text>
    <text x="${x + 66}" y="325" text-anchor="middle" font-family="${font}" font-size="15" fill="${soft}">${kind}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 604" width="1200" height="604" role="img" aria-label="A push to your GitHub repository runs Alchemy in GitHub Actions. Alchemy deploys to your Convex team: production and one preview per pull request, each serving the backend and the site. The identity hub gives each deployment its own sign-in client. samebase.com reads the Alchemy state and shows what is deployed.">
  <defs>
    <marker id="head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${line}"/>
    </marker>
  </defs>
  <rect width="1200" height="604" fill="${fill}"/>

  ${box(690, 28, 482, 96)}
  ${repo(710, 60, "identity-hub")}
  ${title(710, 88, "Sign in with Google and GitHub")}
  ${note(710, 111, "one sign-in client for each deployment")}
  ${arrow(931, 124, 931, 184)}

  ${box(28, 214, 250, 150)}
  ${repo(48, 246, "base")}
  ${title(48, 276, "Your repository")}
  ${note(48, 304, "the app, alchemy.run.ts,")}
  ${note(48, 327, "and one secret")}

  ${arrow(278, 289, 352, 289)}
  ${note(288, 276, "push")}

  ${box(358, 214, 250, 150)}
  ${repo(378, 246, "alchemy-convex")}
  ${title(378, 276, "GitHub Actions")}
  ${note(378, 304, "Alchemy deploys the")}
  ${note(378, 327, "stage of the branch")}

  ${arrow(608, 289, 684, 289)}

  ${box(690, 190, 482, 250, tint)}
  ${repo(710, 222, "convex-hosting")}
  ${title(710, 250, "Your Convex team")}
  ${deployment(706, "prod", "main")}
  ${deployment(854, "pr-12", "preview")}
  ${deployment(1002, "pr-13", "preview")}
  ${note(710, 378, "each one runs the backend and serves the site")}
  ${box(706, 392, 450, 34)}
  <text x="722" y="415" font-family="${mono}" font-size="15" fill="${ink}">alchemy-state-store</text>
  <text x="1140" y="415" text-anchor="end" font-family="${font}" font-size="15" fill="${soft}">what is deployed, and where</text>

  ${arrow(931, 440, 931, 474, true)}
  ${box(690, 480, 482, 96)}
  ${repo(710, 512, "samebase")}
  ${title(710, 540, "The dashboard at samebase.com")}
  ${note(710, 563, "reads the state: URL, commit, checks, previews")}
</svg>
`;
}

for (const [name, theme] of Object.entries(themes)) {
  writeFileSync(new URL(`./map-${name}.svg`, import.meta.url), svg(theme));
}
