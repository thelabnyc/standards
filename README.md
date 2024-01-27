# @thelabnyc/standards

This repository contains standard config files for use by our projects.

## Usage

### Install Package

```bash
echo '@thelabnyc:registry=https://gitlab.com/api/v4/groups/269576/-/packages/npm/' >> .npmrc
npm i --save-dev '@thelabnyc/standards'
```

### EditorConfig

Docs: [EditorConfig](https://editorconfig.org/)

Symlink the .editorconfig file to the root of your project.

```bash
ln -s ./node_modules/@thelabnyc/standards/.editorconfig .editorconfig
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
