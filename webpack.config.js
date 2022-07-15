const path = require("path");

let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode,
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: "source-map",

    devServer: {
        hot: true,
    },
};
