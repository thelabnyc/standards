import { getTSConfig } from "./eslint.mjs";

export default getTSConfig({
    parserOptions: {
        projectService: {
            allowDefaultProject: ["*.js", "*.cjs", "*.mjs"],
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
    },
    configs: [
        {
            ignores: [
                ".cache/**/*",
                "*.js",
                "*.mjs",
                "**/*.js",
                "**/*.mjs",
                "!eslint.config.mjs",
            ],
        },
    ],
});
