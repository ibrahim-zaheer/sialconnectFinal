import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.jsx"],
    settings: {
      react: {
        version: "detect", // Automatically detects the React version
      },
    },
    rules: {},
  },
];
