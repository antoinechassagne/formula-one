module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
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
    "no-shadow": ["error", { ignoreOnInitialization: true }]
  }
};
