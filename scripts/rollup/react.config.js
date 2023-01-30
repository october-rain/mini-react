import {
  getBaseRollupPlugins,
  getPackageJSON,
  resolvePackagePath,
} from "./utils";

import generatePackageJson from "rollup-plugin-generate-package-json";

const { name, module } = getPackageJSON("react");
// react包的路径
const pkgPath = resolvePackagePath(name);
// react产物路径
const pkgDistPath = resolvePackagePath(name, true);

console.log("input", `${pkgPath}/${module}`);
console.log("output", `${pkgDistPath}/index.js`);

export default [
  // react
  {
    input: `${pkgPath}/${module}`, // /Users/dyx/Code/mini-react/packages/react/index.ts
    output: {
      file: `${pkgDistPath}/index.js`, // /Users/dyx/Code/mini-react/dist/node_modules/react/index.js
      name: "index.js",
      format: "umd",
    },
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        // 默认打包哪些参数
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: "index.js",
        }),
      }),
    ],
  },
  // jsx
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      // jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: "jsx-runtime.js",
        format: "umd",
      },
      // jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: "jsx-dev-runtime.js",
        format: "umd",
      },
    ],
    plugins: getBaseRollupPlugins(),
  },
];
