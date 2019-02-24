"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var url = require("url");
var appDirectory = fs.realpathSync(process.cwd());
var resolveApp = function (relativePath) { return path.resolve(appDirectory, relativePath); };
// tslint:disable-next-line:max-line-length
exports.moduleFileExtensions = [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"];
var envPublicUrl = process.env.PUBLIC_URL;
function ensureSlash(inputPath, needsSlash) {
    var hasSlash = inputPath.endsWith("/");
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    }
    else if (!hasSlash && needsSlash) {
        return inputPath + "/";
    }
    else {
        return inputPath;
    }
}
var getPublicUrl = function (appPackageJson) { return envPublicUrl || require(appPackageJson).homepage; };
function getServedPath(appPackageJson) {
    var publicUrl = getPublicUrl(appPackageJson);
    var servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
    return ensureSlash(servedUrl, true);
}
// Resolve file paths in the same order as webpack
var resolveModule = function (resolveFn, filePath) {
    var extension = exports.moduleFileExtensions.find(function (ext) { return fs.existsSync(resolveFn(filePath + "." + ext)); });
    if (extension) {
        return resolveFn(filePath + "." + extension);
    }
    return resolveFn(filePath + ".js");
};
exports.paths = {
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
    servedPath: getServedPath(resolveApp("package.json"))
};
