import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// tslint:disable-next-line:max-line-length
export const moduleFileExtensions = [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"];

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith("/");
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
}

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
  servedPath: getServedPath(resolveApp("package.json")),
};
