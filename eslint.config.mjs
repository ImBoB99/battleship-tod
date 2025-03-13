import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import babelParser from "@babel/eslint-parser";

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
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Spread browser globals
        ...globals.jest, // Spread Jest globals
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"],
        },
      },
    },
  },
  pluginJs.configs.recommended,
  configPrettier, // Disables ESLint rules that might conflict with Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          printWidth: 100, // Ensure this matches your max-len rule
        },
      ],
      "max-len": ["error", { code: 100 }],
    },
  },
];
