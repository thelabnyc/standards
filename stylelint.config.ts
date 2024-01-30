import { Config } from "stylelint";

const config: Config = {
    customSyntax: "postcss-scss",
    plugins: ["stylelint-scss", "@thelabnyc/standards/rules/stylelint"],
    rules: {
        "thelabnyc/no-composing-sass": true,
    },
};

export = config;
