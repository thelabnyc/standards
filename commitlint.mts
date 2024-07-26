import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

export const VALID_PREFIXES = ["Merge", "Revert", ""] as const;

export const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],

    rules: {
        "type-enum": [
            RuleConfigSeverity.Error,
            "always",
            [
                "build",
                "bump",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
            ],
        ],
    },

    // The default ignores of commitlint allow prefixes like fixup! and squash!,
    // which we don't allow. Therefore, we're turning off defaultIgnores and
    // explicitly ignoring only auto-generated merge commit and revert messages
    defaultIgnores: false,
    ignores: [
        (commit) => {
            return VALID_PREFIXES.some((prefix) => {
                return commit.startsWith(prefix);
            });
        },
    ],
};

export default Configuration;
