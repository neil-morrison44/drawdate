const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

module.exports = {
  //...
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].[hash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      meta: {
        viewport: "width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1",
        "apple-mobile-web-app-capable": "yes",
      },
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/logo.png",
      inject: true,
      publicPath: "",
      favicons: {
        appName: "DrawDate",
        background: "rgb(255,205,63)",
        start_url: null,
        orientation: "landscape",
        icons: { apple: true, android: true, appleStartup: true, favicons: true, firefox: true },
      },
    }),
  ],
}
