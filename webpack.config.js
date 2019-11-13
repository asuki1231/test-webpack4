const path = require('path');
// PATH
const ASSET_PATH = process.env.ASSET_PATH || '/';
const src = path.join(__dirname, 'src');
const entrypoint = {
  index: path.join(src, 'index.js'),
};
const output = path.resolve(__dirname, 'dist');

//HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplate = path.join(src, 'index.pug');

module.exports = (env, argv) => {
  return {
    mode: 'development',
    entry: entrypoint,
    output: {
      path: output,
      publicPath: ASSET_PATH,
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          usr: {
            loader: 'pug-loader',
            options: !isProduction ? {
              pretty: true
            } : {}
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: "babel-loader", }
          ],
        },
      ],
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate
      })
    ]
  };
};