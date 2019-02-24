import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin-alt");
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
import { paths } from "./paths";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

export const plugins = {
  // new BundleAnalyzerPlugin(),
  // ts-loader | tslint を別プロセスで動かす
  ForkTsCheckerWebpackPlugin: () =>
    new ForkTsCheckerWebpackPlugin({
      async: true,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTslint,
    }),
  // https://github.com/jantimon/html-webpack-plugin/issues/218
  HtmlWebpackPlugin: ({ isEnvProduction }: { isEnvProduction: boolean }) =>
    new HtmlWebpackPlugin({
      chunks: ["index"],
      inject: true,
      template: paths.appPublic,
      filename: "index.html",
      ...(isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    }),
  MiniCssExtractPlugin: () =>
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].css",
    }),
};
