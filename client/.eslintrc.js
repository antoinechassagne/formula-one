module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["airbnb", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:prettier/recommended"],
  plugins: ["react", "jest"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "trailing-comma": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "func-names": "off",
    "no-shadow": ["error", { ignoreOnInitialization: true }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }]
  }
};
