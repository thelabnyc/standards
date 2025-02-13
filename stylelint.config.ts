import { Config } from "stylelint";

const config: Config = {
    customSyntax: "postcss-scss",
    plugins: ["stylelint-scss", "@thelabnyc/standards/rules/stylelint"],
    rules: {
        // Built-in rule tweaks
        "media-feature-range-notation": null,
        "no-descending-specificity": null,
        "value-keyword-case": null,
        "selector-class-pattern": null,
        // Custom Rules
        "thelabnyc/no-composing-sass": true,
    },
    overrides: [
        {
            files: ["**/*.scss"],
            extends: [
                "stylelint-config-standard-scss",
                "stylelint-config-css-modules",
            ],
            rules: {
                "scss/dollar-variable-colon-space-after": null,
                "scss/dollar-variable-empty-line-before": null,
                "scss/no-global-function-names": null,
            },
        },
    ],
};

export = config;
