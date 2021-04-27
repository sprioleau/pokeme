const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const postcssPresets = require("postcss-preset-env");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

// Reference: https://webpack.js.org/plugins/copy-webpack-plugin/
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const env = process.env.NODE_ENV || "development";
// set to 'production' or 'development' in your env

const finalCSSLoader = env === "production" ? MiniCssExtractPlugin.loader : { loader: "style-loader" };

module.exports = {
	mode: env,
	output: { publicPath: "/" },
	entry: ["./src"], // this is where our app lives
	devtool: "source-map", // this enables debugging with source in chrome devtools
	devServer: { hot: true, historyApiFallback: true },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{ loader: "babel-loader" }],
			},
			{
				test: /\.s?css/,
				use: [
					finalCSSLoader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
						ident: "postcss",
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [autoprefixer(), postcssPresets({ browsers: "last 2 versions" })],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new Dotenv(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new ESLintPlugin({}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			favicon: "./src/app/images/favicon.png",
		}),
		new ImageminPlugin({
			disable: process.env.NODE_ENV !== "production", // Disable during development
			pngquant: {
				quality: "95-100",
			},
			svgo: {},
		}),
		new CopyPlugin({
			patterns: [{ from: "./src/app/images", to: "images" }],
		}),
	],
};
