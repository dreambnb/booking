const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = [{
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.min.js',
    path: DIST_DIR,
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      include: SRC_DIR,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      },
      ],
    },
    ],
  },
},
{
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: { // pass object instead of array, omiting the `style-loader` part but why? 
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
              sourceMap: true
            }
          }
        })
      }  
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css")
  ]
}

];
