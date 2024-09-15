const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8081,
    open: true, // This will open the browser automatically
    proxy: [
      {
        "/add": "http://localhost:8080",
        "/all": "http://localhost:8080",
      },
    ],
  },
});
