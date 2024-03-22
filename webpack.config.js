const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
}

const plugins = [
    new HtmlWebpackPlugin({
        template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    }),
];

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,
    target,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        client: {
            progress: true,
            reconnect: true,
        },
        hot: true,
        compress: true,
        open: true,
        port: 9000,
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ["html-loader"] },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === "production" ? "assets" : "assets/resource",
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "assets/resource",
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    plugins,
};
