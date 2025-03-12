# webpack-project-template

Fully setup webpack with scripts, eslint &amp; prettier

Things done:

npm init -y
// --save-dev sets webpack as development dependancy
npm install --save-dev webpack webpack-cli

mkdir src && touch src/index.js

touch webpack.config.js

// install html webpack plugin as a development dependancy
npm install --save-dev html-webpack-plugin

touch src/template.html

// install css loaders as a development dependancy
npm install --save-dev style-loader css-loader

touch src/styles.css

// install html loader as a development dependancy, it allows image references in html template file
npm install --save-dev html-loader

add the following object to the modules.rules array within webpack.config.js

{
test: /\.html$/i,
loader: "html-loader",
}

// for images in javascript, also add this to the modules.rules array within webpack.config.js:

{
test: /\.(png|svg|jpg|jpeg|gif)$/i,
type: "asset/resource",
}

// install webpack dev server for localhost

npm install --save-dev webpack-dev-server

// add properties to webpack.config.js for properly referenced error lines

devtool: "eval-source-map",
devServer: {
watchFiles: ["./src/template.html"],
},

// add gitignore file (don't forget to add ignore values in the file)

touch .gitignore

// add scripts to package.json

"scripts": {
"build": "webpack --config webpack.prod.js",
"dev": "webpack serve --open --config webpack.dev.js",
"deploy": "npm run build && git add dist -f && git commit -m \"Update deployment\" && git subtree push --prefix dist origin gh-pages",
"initial-deploy": "git branch gh-pages && git checkout gh-pages && git merge main --no-edit && npm run build && git add dist -f && git commit -m \"Initial deployment\" && git subtree push --prefix dist origin gh-pages && git checkout main"
},

// separate webpack configurations for each environment
// install webpack merge

npm install --save-dev webpack-merge

// separate the webpack.config.js file into separate configs which get bundled together
touch webpack.common.js webpack.dev.js webpack.prod.js

// install eslint

npm init @eslint/config@latest

// install prettier for eslint

// edit eslint.config.mjs

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  configPrettier, // Disables ESLint rules that might conflict with Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
    }
  }
];

// install eslint and prettier extensions in vscode



