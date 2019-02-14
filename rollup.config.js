import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";

const input = "src/index.js";

const plugins = [
  babel({
    exclude: "node_modules/**",
  }),
  cleanup(),
];

export default [
  {
    input,
    plugins,
    output: {
      file: "dist/enlearn.warehouse.js",
      format: "cjs",
    },
  },
  {
    input,
    plugins,
    output: {
      file: "dist/enlearn.warehouse.umd.js",
      format: "umd",
      name: "warehouse",
    },
  },
  {
    input,
    plugins,
    output: {
      file: "dist/enlearn.warehouse.esm.js",
      format: "esm",
    },
  },
];
