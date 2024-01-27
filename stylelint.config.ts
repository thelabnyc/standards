import { Config } from "stylelint";

const config: Config = {
    customSyntax: "postcss-scss",
    plugins: ["stylelint-scss", "@thelabnyc/standards/rules/stylelint"],
    rules: {
        "custom-rules/no-composing-sass": true,
    },
};

export = config;
