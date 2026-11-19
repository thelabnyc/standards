import type { DummyRuleMap, OxlintConfig } from "oxlint";

const typeSafety = {
    "typescript/ban-ts-comment": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "typescript/no-unsafe-argument": "error",
    "typescript/no-unsafe-assignment": "error",
    "typescript/no-unsafe-call": "error",
    "typescript/no-unsafe-enum-comparison": "error",
    "typescript/no-unsafe-member-access": "error",
    "typescript/no-unsafe-return": "error",
    "typescript/only-throw-error": "error",
    "typescript/prefer-promise-reject-errors": "error",
    "typescript/require-await": "error",
    "typescript/restrict-plus-operands": "error",
} as const satisfies DummyRuleMap;

const thelabRecommended = {
    "no-var": "error",
    "prefer-const": "error",

    "import/newline-after-import": "error",
    "import/first": "error",

    "react/rules-of-hooks": "error",
    // We use empty arrays to run once, etc.
    "react/exhaustive-deps": "off",

    "no-unused-vars": [
        "error",
        {
            argsIgnorePattern: "^_",
            ignoreRestSiblings: true,
        },
    ],

    // For when we do RPC calls and forget to call await on the promise
    // to check against a null return.
    "typescript/no-unnecessary-condition": "error",

    // We use empty callbacks that are no-ops sometimes.
    "no-empty-function": ["error", { allow: ["arrowFunctions"] }],

    // We want async callbacks to React event handlers.
    "typescript/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
    ],

    "no-use-before-define": "error",
} as const satisfies DummyRuleMap;

/**
 * Oxlint's `correctness` rules plus our own. Upstream rule changes arrive with
 * Oxlint version bumps, so it flags a different set of rules than the ESLint
 * config. Projects should use `getConfig()` rather than extending this
 * directly. Type-aware rules need `oxlint-tsgolint`.
 */
export const recommended: OxlintConfig = {
    plugins: ["typescript", "unicorn", "oxc", "react", "import"],
    categories: {
        correctness: "error",
    },
    env: {
        builtin: true,
    },
    options: {
        typeAware: true,
    },
    rules: {
        ...typeSafety,
        ...thelabRecommended,
    },
};

/**
 * Builds a project's root `oxlint.config.ts` on top of `recommended`. Oxlint
 * doesn't carry `ignorePatterns` through `extends`, so they're set here at the
 * root instead.
 */
export const getConfig = (config: OxlintConfig = {}): OxlintConfig => ({
    ...config,
    extends: [recommended, ...(config.extends ?? [])],
    ignorePatterns: ["*.d.ts", "*.d.mts", ...(config.ignorePatterns ?? [])],
});
