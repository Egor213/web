const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Импортируем плагин
const fs = require('fs');
const webpack = require('webpack');

const pages = fs.readdirSync("./views").filter(name => name.endsWith(".pug"));
const client_js = fs.readdirSync("./static/js_pug").filter(name => name.endsWith(".js"));
const entry = {};
client_js.forEach(file => {
  const name = file.replace(/\.js$/, '');
  entry[name] = `./static/js_pug/${file}`;
});

const OUTDIR = 'build_webpack';

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve(__dirname, `./${OUTDIR}/client`),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], 
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], 
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [["@babel/preset-env"]]
            }
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: 'pug-loader',
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/main.css',
    }),
    new webpack.DefinePlugin({
        COMPL: JSON.stringify('webpack')
    }),
    ...pages.map(file => new HtmlWebpackPlugin({
      template: `./views/${file}`,
      templateParameters: {state: "webpack"},
      filename: `../html/${file.replace(/\.pug/, '.html')}`,
    })),
  ],
};
