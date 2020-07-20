const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  //...
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 8081,
  },
  module: {},
  plugins: [new HtmlWebpackPlugin({ inject: "head" })],
}
