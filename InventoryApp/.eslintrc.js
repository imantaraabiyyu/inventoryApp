module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-unused-vars": [
      "error",
      { vars: "all",
        'react/prop-types': 'on',
        args: "after-used",
       ignoreRestSiblings: true }
    ]
  }
};
