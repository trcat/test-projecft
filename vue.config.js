module.exports = {
    runtimeCompiler: true,
    publicPath: "./",
    outputDir: "dist",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            title: "考试系统"
        }
    }
};