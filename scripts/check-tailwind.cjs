// Fails fast when the installed Tailwind major differs from the one this
// project's config is written for (postcss.config.js, tailwind.config.ts and
// the @tailwind/@apply directives in src/tailwind.css are all v3-style).
const expected = require("../package.json").devDependencies.tailwindcss.replace(/^[^\d]*/, "");
const installed = require("tailwindcss/package.json").version;

if (installed.split(".")[0] !== expected.split(".")[0]) {
  console.error(
    `\nInstalled tailwindcss ${installed}, but this project expects ${expected}.\n` +
      `Run "npm ci" to install the exact versions from package-lock.json.\n`
  );
  process.exit(1);
}
