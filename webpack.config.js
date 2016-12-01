import webpack from 'webpack';
import path from 'path';
// import extractorPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: "#eval-source-map",
  debug : true,
  entry: [
    'webpack-hot-middleware/client',
    './client/app.js'
  ],
  output: {
    path: __dirname,
    filename: '[hash]-[name].js',
    publicPath: '/'
  },
  node: {
    // Prevents the `process.env` defined in server response
    // from being re-defined inside modules
    // see https://github.com/webpack/node-libs-browser
    process: false
  },
  plugins: [
    // This plugin extract css to a different bundle file.
    // available options : [name], [hash]
    // new extractorPlugin('[hash]-[name].css'),

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugin optimizes chunks and modules by
    // how much they are used in the app
    new webpack.optimize.OccurenceOrderPlugin(),

    // This plugin optimizes chunks and modules by
    // how much they are used in the app
    new webpack.optimize.CommonsChunkPlugin({
      name:      'main', // Move dependencies to our main file
      children:  true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),

    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // manage hot reloading
    new webpack.HotModuleReplacementPlugin(),

    // need for Hot reload
    new webpack.NoErrorsPlugin(),

    // define custom env variable throught webpack
    new webpack.DefinePlugin({
      "process.env":   {
        // without this react will not be optimized for production
        NODE_ENV: '"production"',
        BROWSER : "true",
        REDUX_LOGGER : "true"
      },
    }),
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      request: 'browser-request'
    }
  },
  module: {
    preLoaders: [
      // baggage preLoader tries automatically import css or scss files
      // which have the same name as the js file
      {
        test: /\.js/,
        loader: 'baggage?[file].scss&[file].css',
      },
      // check the code with eslint before compiling
      {
        test: /\.js/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'client'),
        query: {
          "env": {
            "development": {
              "presets": ["react-hmre"]
            }
          },
        }
      },
      {
        test:   /\.(scss|css)/,
        include: path.join(__dirname, 'client'),
        loader : 'style!css!sass'
        // loader: extractorPlugin.extract('style', 'css!sass')
      },
      {
        test:   /\.html/,
        loader: 'html'
      },
      {
        test:   /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=10000'
      }
    ]
  }
};
