import * as path from "path";
import * as webpack from "webpack";
import * as commonConfig from "./common";
import { minimizerPluginMap } from "./optimization";
import { moduleFileExtensions, paths } from "./paths";
import { plugins } from "./plugins";
import { rules as defaultRules } from "./rules";

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

export const configFactory = (webpackEnv: "development" | "production"): webpack.Configuration => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: isEnvProduction ? "production" : "development",
    stats: "errors-only",
    entry: {
      index: paths.appIndexJs,
    },
    target: "electron-renderer",
    devtool: "cheap-module-source-map",
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      publicPath: paths.appBuild,
      chunkFilename: isEnvProduction ? "static/js/[name].[chunkhash:8].chunk.js" : isEnvDevelopment && "static/js/[name].chunk.js",
      filename: isEnvProduction ? "static/js/[name].[chunkhash:8].js" : isEnvDevelopment && "static/js/bundle.js",
      pathinfo: isEnvDevelopment,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
        : isEnvDevelopment && (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        minimizerPluginMap.terser({ shouldUseSourceMap }),
        // This is only used in production mode
        minimizerPluginMap.optimizeCssAssetsPlugin({ shouldUseSourceMap }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: "all",
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },
    module: {
      rules: [
        defaultRules.cacheLoader,
        defaultRules.sourceMapLoader,
        defaultRules.tsLoader,
        defaultRules.htmlLoader,
        defaultRules.urlLoader,
        defaultRules.styleLoader,
      ],
    },
    plugins,
    resolve: {
      extensions: moduleFileExtensions,
      alias: commonConfig.alias,
    },
    node: commonConfig.nodepPolyfill,
  };
};