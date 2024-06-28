#!/usr/bin/env bash

set -e

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

# Setup Prettier
cat > "prettier.config.js"<< EOF
const base = require("@thelabnyc/standards/prettier.config");
module.exports = {
    ...base,
};
EOF

# Setup ESLint
cat > ".eslintrc.json"<< EOF
{
    "extends": ["./node_modules/@thelabnyc/standards/eslintrc.js"]
}
EOF


# Setup Stylelint
cat > ".stylelintrc.json"<< EOF
{
    "extends": "@thelabnyc/standards/stylelint.config"
}
EOF
