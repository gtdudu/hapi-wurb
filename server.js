import config from './webpack.config';
// import chokidar from 'chokidar';
import cssModulesRequireHook from 'css-modules-require-hook';
import webpack from 'webpack';
import hapi from 'hapi';
import routes from './server/app.js';
import inert from 'inert';
import happyDevPlugin from 'hapi-webpack-plugin';

cssModulesRequireHook({generateScopedName: '[path][name]-[local]'});
const compiler = webpack(config);

// webpack-dev-middleware config
const assets = {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender : true
};

// webpack-hot-middleware config
const hot = {};

// create hapi server;
const server = new hapi.Server();
server.connection({host: "127.0.0.1", port: 8000});

// start server
server.register([
  // server static assets
  inert,
  {
  // Serve hot-reloading bundle to client
    register : happyDevPlugin,
    options : {
      compiler,
      assets,
      hot
    }
  }], (err) => {
  if (err) throw err;
  server.start(() => {
    console.log("running at : " +`${server.info.uri}`);
  });
});

// inert config : serve public folder with inert
server.route({
  method: 'GET',
  path: '/public/assets/{param*}',
  handler: {
    directory: {
      path: './public/assets',
      redirectToSlash: true,
    }
  }
});


// Anything else gets passed to the client app's server rendering
server.ext('onPreResponse', function(request, reply) {
  if (request.path.length >= 4 && request.path.substr(0, 4) === '/api') {
    return reply.continue();
  }

  if (request.path.length >= 7 && request.path.substr(0, 7) === '/public') {
    console.log('lol');
    return reply.continue();
  }
  console.log("goes here ? ", request.path, request.path.substr(0, 7));

  // get generated assets name(s) and make sure it's an array of strings
  const rawWebpackAssets = request.raw.res.locals.webpackStats.toJson().assetsByChunkName.main;
  const WebpackAssets = Array.isArray(rawWebpackAssets) ? rawWebpackAssets : [rawWebpackAssets];

  require('./client/server-render')(request.path, WebpackAssets, function(err, page) {
    if (err) {
      if (err.err && err.err === "redirect") reply.redirect(err.args);
      else if (err.err === "continue") reply.continue();
      else  return reply(err);
    }
    reply(page);
  });
});

// Include server routes
server.route(routes);

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
// const watcher = chokidar.watch('./server/app.js');
//
// watcher.on('ready', function() {
//   watcher.on('all', function() {
//     console.log("Clearing /server/ module cache from server");
//     Object.keys(require.cache).forEach(function(id) {
//       if (/[\/\\]server[\/\\]/.test(id)){
//         delete require.cache[id];
//       }
//     });
//   });
// });

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
  });
});
