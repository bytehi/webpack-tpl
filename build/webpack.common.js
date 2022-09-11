const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '..', 'src')

module.exports = {
  entry: path.join(srcPath, 'index'),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
          test: /\.js$/,
          use: ['babel-loader'],
          include: srcPath,
          exclude: /node_modules/
      },
      {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']  // loader 的执行顺序是：从后往前
      },
      {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']  // 增加 'sass-loader' ，注意顺序
      },
      {
          test: /\.(woff2?|ttf|eot|otf)(\?.*)?$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 500 * 1024, // <=500kb 则使用 base64 （即，希望字体文件一直使用 base64 ，而不单独打包）
                  },
              },
          ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'tpl/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js']
  },
}
