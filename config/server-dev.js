import configDev from '../webpack.config.js';
import cssModulesRequireHook from 'css-modules-require-hook';
import webpack from 'webpack';
import hapi from 'hapi';
import inert from 'inert';
import happyDevPlugin from 'hapi-webpack-plugin';
import api from '../api/';
import path from 'path'

// checking NODE_ENV just to be safe...
if (process.env.NODE_ENV === "development") {

  // require hook to compile CSS Modules in runtime
  // https://github.com/css-modules/css-modules-require-hook
  cssModulesRequireHook({generateScopedName: '[path][name]-[local]'});
  const compiler = webpack(configDev);

  // webpack-dev-middleware config
  const assets = {
    noInfo: true,
    publicPath: configDev.output.publicPath,
    serverSideRender : true
  };

  // webpack-hot-middleware config
  const hot = {};

  const hapiPlugins = [
    // inert is used to serve asset files both in prod and dev
    inert
  ]

  const registerHapiWepackPlugin = {
    // Serve hot-reloading bundle to client
    register : happyDevPlugin,
    options : {
      compiler,
      assets,
      hot
    }
  }

  // adds hapi-dev-plugin to our current server plugins (not sure if
  // position actually matters...)
  hapiPlugins.push(registerHapiWepackPlugin)

  // create hapi server;
  const server = new hapi.Server();

  // check process and connect server
  const host = process.env.HOST || "127.0.0.1"
  const port = process.env.HOST || 8000
  server.connection({host, port});

  // start server
  server.register(hapiPlugins, (err) => {
    if (err) throw err;
    server.start(() => {
      console.log("running at : " +`${server.info.uri}`);
    });
  });

  // inert config : serve public/assets folder with inert
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../assets'),
        redirectToSlash: true,
      }
    }
  });

  // Include api routes
  server.route(api);


  // Anything else gets passed to the client app's server rendering
  server.ext('onPreResponse', function(request, reply) {

    // the 'onPreResponse' hook will catch all request therefore we need
    // to prevent it from messing with inert serving static files...
    // should we have one build and one public folders ? or better to have a nested
    // public folder ?
    // this doesn't look really clean : todo find a better way
    if (request.path.length >= 4 && request.path.substr(0, 4) === '/api') {
      return reply.continue();
    }
    if (request.path.length >= 7 && request.path.substr(0, 7) === '/public') {
      return reply.continue();
    }

    // get generated assets name(s) and make sure it's an array of strings
    const rawWebpackAssets = request.raw.res.locals.webpackStats.toJson().assetsByChunkName.main;
    const WebpackAssets = Array.isArray(rawWebpackAssets) ? rawWebpackAssets : [rawWebpackAssets];

    // generate html depending on route and serve it to the client
    return require('../client/server-render')(request.path, WebpackAssets, function(err, page) {
      if (err) {
        // this works but we probably need a better way to handle errors
        if (err.err && err.err === "redirect") reply.redirect(err.args);
        else if (err.err === "continue") reply.continue();
        else  return reply(err);
      }
      reply(page);
      return;
    });
  });

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', function() {
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });

}
