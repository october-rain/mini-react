// const fs = require("fs");
// const path = require("path");
import fs from "fs";
import path from "path";

import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";

// /Users/dyx/Code/mini-react/packages
const pkgPath = path.resolve(__dirname, "../../packages");
// /Users/dyx/Code/mini-react/dist/node_modules
const distPath = path.resolve(__dirname, "../../dist/node_modules");

console.log("pkgPath", pkgPath);
console.log("distPath", distPath);

// 解析包路径
export function resolvePackagePath(pkgName, isDist) {
  if (isDist) {
    return `${distPath}/${pkgName}`;
  }
  return `${pkgPath}/${pkgName}`;
}

// 解析 package.json 路径
export function getPackageJSON(pkgName) {
  const path = `${resolvePackagePath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
