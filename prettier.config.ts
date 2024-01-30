import type { PluginConfig as SortConfig } from "@trivago/prettier-plugin-sort-imports";
import type { Config as BaseConfig } from "prettier";

type Config = BaseConfig & SortConfig;

const config: Config = {
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    printWidth: 80,
    tabWidth: 4,
    quoteProps: "consistent",
    trailingComma: "all",
    importOrder: [
        // Sort node built-ins to the top
        "^node:",
        // Next is any third-party modules, like React.
        "<THIRD_PARTY_MODULES>",
        // @reactivated namespace
        "^@reactivated$",
        "^@reactivated/(.*)$",
        // @thelabnyc namespace
        "^@thelabnyc/(.*)$",
        // All repo-local files EXCEPT for stylesheets
        "^[./]+(?!.*(.s?css))",
        // Lastly, styles.
        "^[./](.*)\\.module\\.s?css$",
        "^[./](.*)\\.s?css$",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    overrides: [
        {
            files: [
                "*.yml",
                "*.yaml",
                "package.json",
                "yarn.lock",
                "package-lock.json",
            ],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["*.json"],
            options: {
                trailingComma: "none",
            },
        },
    ],
};

export = config;
