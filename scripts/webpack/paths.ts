import * as fs from "fs";
import * as path from "path";
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// tslint:disable-next-line:max-line-length
export const moduleFileExtensions = [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"];

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(ext => fs.existsSync(resolveFn(`${filePath}.${ext}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

export const paths = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.tsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appTslint: resolveApp("tslint.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  // proxySetup: resolveApp("src/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  // servedPath: getServedPath(resolveApp("package.json")),
};
