import type { Config as BaseConfig } from "prettier";
import type { PluginConfig as SortConfig } from "@trivago/prettier-plugin-sort-imports";

type Config = BaseConfig & SortConfig;

const config: Config = {
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    printWidth: 80,
    tabWidth: 4,
    quoteProps: "consistent",
    trailingComma: "all",
    importOrder: ["^node:", "<THIRD_PARTY_MODULES>", "^@reactivated$", "^@reactivated/(.*)$", "^@thelabnyc/(.*)$", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    overrides: [
        {
            files: ["*.yml", "*.yaml", "package.json", "yarn.lock", "package-lock.json"],
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
