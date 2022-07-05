module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "trailing-comma": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
    "no-shadow": ["error", { ignoreOnInitialization: true }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }]
  }
};
