module.exports = {
    publicPath: "./",
    outputDir: "dist",
    pages: {
        index: {
            entry: "src/main.js",
            template: "src/template/basic.html",
            title: "考试系统",
            chunks: ["chunk-vendors","chunk-common","index"]
        }
    }
};