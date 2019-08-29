module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "no-console": "off",
  },
  plugins: ["jest"],
  extends: ["@enlearn", "plugin:jest/recommended"],
  overrides: [
    {
      files: ["*.test.js"],
      parserOptions: {
        ecmaVersion: 2017,
      },
      env: {
        browser: false,
        node: true,
        "jest/globals": true,
      },
    },
    {
      files: ["rollup.config.js"],
      env: {
        browser: false,
        node: true,
      },
    },
    {
      files: [
        ".eslintrc.js",
        "babel.config.js",
        "jest.config.js",
        "prettier.config.js",
      ],
      parserOptions: {
        sourceType: "script",
      },
      env: {
        browser: false,
        node: true,
      },
      rules: {
        "no-console": "off",
      },
    },
  ],
};
