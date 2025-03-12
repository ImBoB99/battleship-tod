import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "babel.config.json",
      "jest.config.js",
      "__mocks__/",
      "webpack.common.js",
      "webpack.prod.js",
      "webpack.dev.js",
      "package-lock.json",
      "package.json",
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  configPrettier, // Disables ESLint rules that might conflict with Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
    },
  },
];
