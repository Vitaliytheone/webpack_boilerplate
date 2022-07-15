const path = require("path");

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "source-map",

    devServer: {
        hot: true,
    },
};
