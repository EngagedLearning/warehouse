import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

const input = "src/index.js";
const commonJsPlugin = commonjs();
const babelPlugin = babel();

const debugPlugins = [commonJsPlugin, babelPlugin];

export default [
  {
    input,
    output: {
      file: "dist/bundle.js",
      format: "cjs",
    },
    plugins: debugPlugins,
  },
];
