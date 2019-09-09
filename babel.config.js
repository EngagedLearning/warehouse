module.exports = {
  plugins: ["transform-es2015-modules-commonjs"],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        spec: false,
        loose: true,
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            spec: false,
            loose: true,
            exclude: ["@babel/plugin-transform-regenerator"],
          },
        ],
      ],
    },
  },
};
