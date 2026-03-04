# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository (`@thelabnyc/standards`) provides standardized linting, formatting, and commit message configurations for TheLab projects. It is published as an NPM package to GitLab's package registry and consumed by other TheLab projects.

## Build and Test Commands

```bash
# Install dependencies
npm ci

# Build TypeScript files (compiles .mts source to .mjs output)
npm run build

# Run all checks (commit messages + ESLint)
npm run check

# Lint commit messages (from CI_MERGE_REQUEST_DIFF_BASE_SHA or last 10 commits)
npm run check:lint-commits

# Lint JavaScript/TypeScript with ESLint
npm run check:lint-js

# Run pre-commit hooks on all files
pip3 install pre-commit
pre-commit run --all-files

# Prepare for publishing (runs build automatically)
npm run prepack
```

## Architecture

### Source File Structure

This package provides configuration files that are consumed by other projects:

- **commitlint.mts/.mjs** - Commitlint configuration with conventional commit types
- **eslint.mts/.mjs** - ESLint flat config with TypeScript, React, and import rules
- **prettier.config.ts/.js** - Prettier configuration with import sorting
- **stylelint.config.ts/.js** - Stylelint configuration for SCSS and CSS modules
- **.editorconfig** - Editor configuration
- **.markdownlint.json** - Markdown linting rules
- **bin/install.sh** - Installation script that sets up configs in consuming projects
- **rules/stylelint/** - Custom stylelint rules

### TypeScript Build Process

The package uses TypeScript to compile `.mts` source files to `.mjs` JavaScript output files. The build:

- Extends `@tsconfig/node24/tsconfig.json`
- Generates declaration files (`.d.ts`, `.d.mts`)
- Ignores `.d.ts` and `.d.mts` files from linting (see `eslint.mjs:11`)

### ESLint Configuration System

The `eslint.mjs` exports:

- **configs** object - Individual config pieces (ignores, jsxFiles, reactHooksRecommended, etc.)
- **recommended** array - Complete flat config array
- **getTSConfig()** function - Primary export for consuming projects that:
    - Accepts `parserOptions` (including `tsconfigRootDir`)
    - Normalizes `projectService` to allow JS/JSX files outside tsconfig
    - Merges TypeScript type-aware rules with base configs
    - Scopes type-checking rules to TS/TSX files only

Consuming projects call `getTSConfig()` with their root directory to get a complete ESLint flat config.

### Commitlint Configuration

The `commitlint.mjs` enforces conventional commits with custom rules:

- Allows specific commit types: build, bump, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Disables default ignores (no `fixup!` or `squash!` prefixes)
- Only ignores auto-generated merge and revert messages

### Prettier Import Ordering

The prettier config uses `@trivago/prettier-plugin-sort-imports` with this import order:

1. Node built-ins (`node:*`)
2. Third-party modules
3. `@reactivated` namespace
4. `@thelabnyc` namespace
5. Relative imports (excluding styles)
6. CSS module imports (`.module.scss`, `.module.css`)
7. Regular stylesheet imports

### Installation Process

When `npx install-thelab-standards` runs, it:

1. Installs `@thelabnyc/standards` as devDependency
2. Symlinks `.editorconfig` and `.markdownlint.json` from node_modules
3. Creates `.commitlintrc.ts`, `prettier.config.js`, `eslint.config.mjs`, and `.stylelintrc.json` that extend this package's configs

## CI/CD Pipeline

The GitLab CI pipeline (`.gitlab-ci.yml`) has two stages:

### lint stage

- Runs on MRs, protected branches, and tags
- Uses TheLab Python Docker image (includes Node.js)
- Executes: `npm run build`, `npm run check`, and `pre-commit run --all-files`
- Caches pre-commit hooks in `.cache/pre-commit`

### release stage

- Includes components from `thelabnyc/thelab-ci-components`:
    - `publish-gitlab-release@0.6.0` - Creates GitLab release
    - `publish-to-npm@0.6.0` - Publishes to NPM registry
- Sets `NPM_CONFIG_PROVENANCE: "false"` (sigstore disabled until GitLab self-hosted runner support)

## Package Publishing

The package is published to GitLab's NPM registry at:

```bash
https://gitlab.com/api/v4/groups/269576/-/packages/npm/
```

Consuming projects must configure NPM scope routing:

```bash
echo '@thelabnyc:registry=https://gitlab.com/api/v4/groups/269576/-/packages/npm/' >> .npmrc
```

## Git Workflow

- Main branch: `master`
- Uses Renovate for dependency updates (`renovate.json`)
- Uses commitizen for commit message formatting (`.cz.toml`)
- Enforces conventional commits via commitlint in CI
