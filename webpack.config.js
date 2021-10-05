var path=require('path')

module.exports = {
    entry: __dirname + '/src',
    output: {
      path: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                "es2015", "react"
              ]
            }
          }]
        }
      ]
    }
  }