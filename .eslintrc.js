module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript", "plugin:prettier/recommended", "prettier", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    project: ["./tsconfig.json"]
  },
  ignorePatterns: ["!**/*", ".storybook/*"],
  rules: {
    "prettier/prettier": ["error", {
      endOfLine: "auto"
    }]
  }
};