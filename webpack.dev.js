//webpack.dev.js
const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8081,
    open: {
      target: "http://localhost:8081", // or any URL you want to open
      // You can also specify a browser like:
      // app: { name: "chrome" },
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use(
        "/add",
        createProxyMiddleware({
          target: "http://localhost:8080",
          changeOrigin: true,
        })
      );
      devServer.app.use(
        "/all",
        createProxyMiddleware({
          target: "http://localhost:8080",
          changeOrigin: true,
        })
      );
      return middlewares;
    },
  },
});
