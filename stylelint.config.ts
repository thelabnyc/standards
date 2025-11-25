import { Config } from "stylelint";

const config: Config = {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-prettier-scss",
    ],
    plugins: ["@thelabnyc/standards/rules/stylelint"],
    rules: {
        // Built-in rule tweaks
        "media-feature-range-notation": null,
        "no-descending-specificity": null,
        "value-keyword-case": null,
        "selector-class-pattern": null,
        // Custom Rules
        "thelabnyc/no-composing-sass": true,
        "scss/dollar-variable-empty-line-before": null,
        "scss/double-slash-comment-empty-line-before": null,
        "at-rule-empty-line-before": null,
    },
    overrides: [
        {
            files: ["**/*.module.scss"],
            extends: [
                "stylelint-config-standard-scss",
                "stylelint-config-prettier-scss",
                "stylelint-config-css-modules",
            ],
        },
        {
            files: ["**/*.module.css"],
            extends: ["stylelint-config-css-modules"],
        },
    ],
};

export = config;
