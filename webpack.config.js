const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
    },
    devServer: {
        static: './docs',
      },
    module: {
        rules: [
            {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    targets: "defaults",
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    },
      
    
    plugins: [
        new HtmlWebpackPlugin({  // Also generate a test.html
          filename: 'index.html',
          template: 'src/index.html'
        })
      ]
    
  
};