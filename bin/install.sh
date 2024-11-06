#!/usr/bin/env bash

set -euxo pipefail

# Make sure we're in the right directory.
if [ ! -f "./package.json" ]; then
    echo "Aborting. File package.json does not exist in directory $(pwd)"
    exit 1
fi

# Install package
npm install --save-dev "@thelabnyc/standards@latest"

# Setup symlinks
for SYMLINK in ".editorconfig" ".markdownlint.json"
do
    ln -f -s "./node_modules/@thelabnyc/standards/$SYMLINK" "$SYMLINK"
done

# Setup commitlint
cat > ".commitlintrc.ts"<< EOF
import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@thelabnyc/standards/commitlint.mjs"],
};
export default Configuration;
EOF

# Setup Prettier
cat > "prettier.config.js"<< EOF
const base = require("@thelabnyc/standards/prettier.config");
module.exports = {
    ...base,
};
EOF

# Setup ESLint
cat > "eslint.config.mjs"<< EOF
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

EOF


# Setup Stylelint
cat > ".stylelintrc.json"<< EOF
{
    "extends": "@thelabnyc/standards/stylelint.config"
}
EOF
