import {createPlugin, Rule} from "stylelint";
import noComposingSass from "./no-composing-sass";

const namespace = "thelabnyc";
const rules: Rule[] = [
    noComposingSass,
];

const plugins = rules.map((rule) => {
  return createPlugin(`${namespace}/${rule.ruleName}`, rule);
});

export = plugins;
