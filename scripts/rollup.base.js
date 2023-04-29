const json = require("@rollup/plugin-json");
const typescript = require("@rollup/plugin-typescript");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const pkg = require("../package.json");
const path = require("path");
const resolve = (name) => path.resolve(__dirname, name);
const plugins = [
  nodeResolve(),
  json(),
  typescript({
    compilerOptions: {
      lib: ["es5", "es6", "dom"],
      target: "es5"
    },
    exclude: [
      "node_modules/",
      "./dist/",
      "./test/",
      "./lib/",
      "./coverage/",
      "./scripts/",
      "./jest.config.ts",
      "./test.js",
    ],
  }),
  commonjs({
    extensions: [".js", ".ts"],
  }),
  babel({
    babelHelpers: "bundled",
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    exclude: "node_modules/**",
  }),
];
const input = resolve("../src/index.ts");
const formats = [
  {
    file: resolve("../lib/index.cjs.js"),
    format: "cjs",
    name: "canvas2Poster",
  },
  {
    file: resolve("../lib/index.umd.js"),
    format: "umd",
    name: "canvas2Poster",
  },
  {
    file: resolve("../lib/index.es.js"),
    format: "es",
  },
];

module.exports = {
  input,
  formats,
  plugins,
};
