import eslint from "@eslint/js";
import type { TSESLint } from "@typescript-eslint/utils";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import * as hooksPlugin from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import type { ConfigWithExtends } from "typescript-eslint";
import tseslint from "typescript-eslint";

export type FlatConfigs = {
    [t: string]: TSESLint.FlatConfig.Config;
};

export const configs = {
    ignores: {
        ignores: ["*.d.ts", "*.d.mts", "**/*.d.ts", "**/*.d.mts"],
    },

    reactHooksRecommended: {
        plugins: {
            "react-hooks": hooksPlugin,
        },

        rules: {
            ...hooksPlugin.configs.recommended.rules,
        },
    },

    unusedImportsRecommended: {
        plugins: {
            "unused-imports": unusedImports,
        },
        rules: {
            // Typescript overrides from recommended
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },

    thelabRecommended: {
        settings: {
            "react": {
                version: "detect",
            },
            "import/resolver": "typescript",
        },

        rules: {
            // Prettier does this.
            "sort-imports": 0,

            // TypeScript handles this for us.
            "import/namespace": 0,
            "import/named": 0,
            "import/no-unresolved": 0,

            // immer's default export is produce, not matching the filename.
            // TODO: I think immer can be specifically imported now.
            "import/no-named-as-default": 0,
            "import/no-named-as-default-member": 0,

            "import/newline-after-import": ["error"],
            "import/first": ["error"],
            "import/order": 0,

            // React overrides
            "react/prop-types": "off",
            "react/display-name": "off",
            // Typescript covers this and it doesn't understand react-three-fiber elements
            "react/no-unknown-property": "off",
            // We use empty arrays to run once, etc.
            "react-hooks/exhaustive-deps": "off",

            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-non-null-assertion": "off",

            // For when we do RPC calls and forget to call await on the promise
            // to check against a null return.
            "@typescript-eslint/no-unnecessary-condition": "error",

            // We use empty callbacks that are no-ops sometimes.
            "@typescript-eslint/no-empty-function": [
                "error",
                {
                    allow: ["arrowFunctions"],
                },
            ],

            // See: https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1057096238
            // We want async callbacks to React event handlers
            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],

            // https://www.reddit.com/r/typescript/comments/uiil9k/am_i_crazy_for_expecting_typescript_to_catch_this/
            "@typescript-eslint/no-use-before-define": ["error"],
        },
    },
} as const satisfies FlatConfigs;

export const recommended: TSESLint.FlatConfig.Config[] = [
    configs.ignores,
    eslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    configs.reactHooksRecommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    importPlugin.flatConfigs.typescript,
    importPlugin.flatConfigs.errors,
    importPlugin.flatConfigs.warnings,
    configs.unusedImportsRecommended,
    configs.thelabRecommended,
];

export const getTSConfig = ({
    parserOptions,
    configs = [],
}: {
    parserOptions: Partial<TSESLint.FlatConfig.ParserOptions> & {
        tsconfigRootDir: string;
    };
    configs: ConfigWithExtends[];
}): ReturnType<typeof tseslint.config> => {
    return tseslint.config(
        ...recommended,
        {
            languageOptions: {
                parserOptions: {
                    projectService: true,
                    ...parserOptions,
                },
            },
        },
        ...configs,
    );
};
