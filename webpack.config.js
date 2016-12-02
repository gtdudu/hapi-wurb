import webpack from 'webpack';
import path from 'path';

export default {
  devtool: "#eval-source-map",
  debug : true,
  target : "web",
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

    // This plugin looks for similar chunks and files
    // and merges them for better caching by the user
    new webpack.optimize.DedupePlugin(),

    // This plugin optimizes chunks and modules by
    // how much they are used in the app
    new webpack.optimize.OccurenceOrderPlugin(),

    // manage hot reloading
    new webpack.HotModuleReplacementPlugin(),

    // need for Hot reload
    new webpack.NoErrorsPlugin(),

    // define custom env variable throught webpack
    new webpack.DefinePlugin({
      "process.env":   {
        // without this react will not be optimized for production
        NODE_ENV: '"development"',
        BROWSER : "true",
        REDUX_LOGGER : "true"
      },
    }),
  ],
  resolve: {
    // extensions not need while importing js files. webpack will
    // try those ones automatically !
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
        // run all the code through babel (see .babelrc )
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'client'),
        query: {
          "env": {
            "development": {
              // without this component have a hard finguring out how to re render
              // after a hot update
              "presets": ["react-hmre"]
            }
          },
        }
      },
      {
        // in development the css will be bundle in the bundle.js file
        test:   /\.(scss|css)/,
        include: path.join(__dirname, 'client'),
        loader : 'style!css!sass'
      },
      {
        test:   /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url?limit=10000'
      }
    ]
  }
};
