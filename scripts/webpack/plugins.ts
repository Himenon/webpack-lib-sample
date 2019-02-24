import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin-alt");
// import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
import { paths } from "./paths";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

export const plugins: webpack.Plugin[] = [
  // new BundleAnalyzerPlugin(),
  // ts-loader | tslint を別プロセスで動かす
  new ForkTsCheckerWebpackPlugin({
    async: true,
    watch: paths.appSrc,
    tsconfig: paths.appTsConfig,
    tslint: paths.appTslint,
  }),
  // https://github.com/jantimon/html-webpack-plugin/issues/218
  // new HtmlWebpackPlugin({
  //   chunks: ["index"],
  //   template: "./public/index.html",
  //   filename: "index.html",
  // }),
  new MiniCssExtractPlugin({
    filename: "stylesheets/[name].css",
  }),
];
