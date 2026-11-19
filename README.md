# @thelabnyc/standards

This repository contains standard config files for use by our projects.

## Automatic Setup

Config NPM to route the `@thelabnyc` scope to Gitlab:

```bash
echo '@thelabnyc:registry=https://gitlab.com/api/v4/groups/269576/-/packages/npm/' >> .npmrc
```

Run install script. For details of what this script does, see [bin/install.sh](bin/install.sh).

```bash
npx --package='@thelabnyc/standards' install-thelab-standards
```

To set up [Oxlint](#oxlint) instead of ESLint, pass `--oxlint`:

```bash
npx --package='@thelabnyc/standards' install-thelab-standards --oxlint
```

## Manual Setup

### Install Package

Config NPM to route the `@thelabnyc` scope to Gitlab:

```bash
echo '@thelabnyc:registry=https://gitlab.com/api/v4/groups/269576/-/packages/npm/' >> .npmrc
```

Install package:

```bash
npm i --save-dev '@thelabnyc/standards'
```

### Commitlint

Docs: [Commitlint](https://commitlint.js.org/guides/getting-started.html)

Add a file called `.commitlintrc.ts` to your project root with the following content:

```ts
import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@thelabnyc/standards/commitlint.mjs"],
};
export default Configuration;
```

Use `git log --oneline` to find the short hash of the previous commit and take note of it

Add the following NPM script to package.json:

`"check:lint-commits": "commitlint --from deadbeef"` (where deadbeef is the short hash from the previous step)

Add the new script to `package.json`, then add a call to `check:lint` in the `check` NPM script.

```json
{
    "scripts": {
        "check:lint-commits": "commitlint --from ${CI_MERGE_REQUEST_DIFF_BASE_SHA:-HEAD~10}",
        "check:lint": "npm run check:lint-commits && npm run check:lint-css && npm run check:lint-js && npm run check:lint-markdown"
    }
}
```

### EditorConfig

Docs: [EditorConfig](https://editorconfig.org/)

Symlink the .editorconfig file to the root of your project.

```bash
ln -s ./node_modules/@thelabnyc/standards/.editorconfig .editorconfig
```

### ESLint

Docs: [ESLint](https://eslint.org/)

Add an ESLint config file that extends `@thelabnyc/standards/eslint.mjs`.

Example `eslint.config.mjs`:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getTSConfig } from "@thelabnyc/standards/eslint.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default getTSConfig({
    parserOptions: {
        tsconfigRootDir: __dirname,
    },
});
```

### Oxlint

Docs: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

Oxlint is a much faster alternative to ESLint. Use one or the other, not both.

The Oxlint config doesn't copy the ESLint config's rules. It turns on Oxlint's `correctness` rules, then adds the type-aware TypeScript rules and our own picks from the ESLint config. New Oxlint versions bring new rules on their own, so the two configs flag different things. Also:

- Oxlint's `no-unused-vars` replaces `eslint-plugin-unused-imports`. To remove unused imports, run `oxlint --fix-suggestions`; a plain `--fix` doesn't.
- `typescript/no-unnecessary-condition` is still experimental in Oxlint.

Type-aware rules run through `oxlint-tsgolint`, which this package installs. The config file needs Node 22.18+ or 24+.

Add an Oxlint config file built with `getConfig()` from `@thelabnyc/standards/oxlint.mjs`. It takes the same fields as `defineConfig()`, for adding project rules or ignores.

Example `oxlint.config.mts`:

```ts
import { getConfig } from "@thelabnyc/standards/oxlint.mjs";

export default getConfig();
```

### Markdownlint

Symlink the .markdownlint.json file to the root of your project.

```bash
ln -s ./node_modules/@thelabnyc/standards/.markdownlint.json .markdownlint.json
```

### Prettier

Docs: [Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations)

Add a Prettier config file that extends `@thelabnyc/standards/prettier.config`.

Example `prettier.config.js`:

```js
const base = require("@thelabnyc/standards/prettier.config");
module.exports = {
    ...base,
};
```

### Stylelint

Docs: [Stylelint](https://stylelint.io/)

Add a stylelint config file that extends `@thelabnyc/standards/rules/stylelint`.

Example `.stylelintrc.json`:

```json
{
    "extends": "@thelabnyc/standards/stylelint.config"
}
```
