const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// 从css文件中提取css代码到单独的文件中，对css代码进行代码压缩等
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pwd = process.cwd();

function getEntry() {
  const entryFiles = glob.sync(path.join(pwd, "./pages/*/index.js"));
  let entry = {};
  let htmlWebpackPlugins = [];
  entryFiles.forEach((url) => {
    const match = url.match(/\pages\/(.*)\/index\.js/);
    const name = match && match[1];
    if (name) {
      entry[name] = url;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(pwd, `./pages/${name}/index.html`),
          filename: `${name}.html`,
          chunks: [name],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })
      );
    }
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
}

const { entry, htmlWebpackPlugins } = getEntry();
module.exports = {
  entry: entry,
  output: {
    filename: "[name].[hash].js",
    path: path.join(pwd, "./dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
      {
        test: /.vue$/,
        use: "vue-loader",
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new cleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash].css",
    }),
    new VueLoaderPlugin(),
  ].concat(htmlWebpackPlugins),
};
