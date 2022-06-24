module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "trailing-comma": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
    "no-shadow": ["error", { ignoreOnInitialization: true }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }]
  }
};
