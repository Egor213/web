const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// const OUTDIR = path.resolve(__dirname, 'build');
// const paths = {
//     styles: path.resolve(__dirname, 'styles'),
//     html: path.resolve(__dirname, 'views'),
//     script: {
//         src_server: [
//             path.resolve(__dirname, 'js'),
//             path.resolve(__dirname, 'app.js'),
//             path.resolve(__dirname, 'database')
//         ],
//         src_client: path.resolve(__dirname, 'static', 'js_pug')
//     },
//     db: path.resolve(__dirname, 'database', 'database_json'),
//     img: path.resolve(__dirname, 'static', 'img')
// };

// console.log(fs.readdirSync("./views"))



const pages = fs.readdirSync("./test/views").filter(name => name.endsWith(".pug"));
const client_js = fs.readdirSync("./static/js_pug").filter(name => name.endsWith(".js"));
const updated_files = client_js.map(file => `./static/js_pug/${file}`);
module.exports = {
  mode: 'production',
  entry: updated_files,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [ ["@babel/preset-env"] ]
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
        // new webpack.ProvidePlugin({ $: "./jquery", jQuery: "jquery" }),
        ...pages.map(file => new HtmlWebpackPlugin({
            template: `./test/views/${file}`,
            filename: `./test/${file.replace(/\.pug/, '.html')}`,
            inject: false
        })),
    ],
};
