module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    sourceType: "commonjs"
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "trailing-comma": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "@typescript-eslint/no-shadow": ["error", { ignoreOnInitialization: true }],
    "@typescript-eslint/no-use-before-define": "off"
  }
};
