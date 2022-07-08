module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    sourceType: "module"
  },
  extends: ["airbnb", "airbnb-typescript", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "trailing-comma": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
    "no-shadow": ["error", { ignoreOnInitialization: true }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "@typescript-eslint/no-use-before-define": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off"
  }
};
