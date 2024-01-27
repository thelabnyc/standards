import stylelint from "stylelint";

const ruleName = "no-composing-sass";

const messages = stylelint.utils.ruleMessages(ruleName, {
    expected:
        "Expected `.css`; composing from an external Sass file is not allowed",
});

/**
 * Our current setup allows us to use Sass and use CSS Modules, but not together.
 * See https://github.com/vitejs/vite/issues/10340 for details.
 *
 * While it's technically possible to compose from something in a Sass file as
 * long as the particular declaration only uses valid CSS, we think it's better
 * to avoid this for now for the sake of clarity.
 */
const rule: stylelint.Rule = () => {
    return function lint(root, result) {
        root.walkDecls((declaration) => {
            const conditionToTriggerError =
                declaration.prop.includes("composes") &&
                declaration.value.includes(".scss");
            if (!conditionToTriggerError) {
                return; // No error!
            }
            stylelint.utils.report({
                ruleName: ruleName,
                result: result,
                message: messages.expected,
                node: declaration,
                word: ".scss", // For correct cursor positioning of error
            });
        });
    };
};

rule.ruleName = ruleName;
rule.messages = messages;

export = rule;
