const debug = process.env.NODE_ENV !== "production";

module.exports = {
    runtimeCompiler: true,
    publicPath: "/",
    outputDir: "dist",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            title: "考试系统"
        }
    },
    devServer: {
        proxy: ""
    },
    configureWebpack: config => {
        if (debug) {
            config.devtool = "source-map";
        }
    }
};