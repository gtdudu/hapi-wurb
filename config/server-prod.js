import cssModulesRequireHook from 'css-modules-require-hook';
import hapi from 'hapi';
import inert from 'inert';
import api from '../api';
import path from 'path'
import stats from "../build/assets.json"

// checking NODE_ENV just to be safe...
if (process.env.NODE_ENV === "production") {

  // require hook to compile CSS Modules in runtime
  // https://github.com/css-modules/css-modules-require-hook
  cssModulesRequireHook({generateScopedName: '[path][name]-[local]'});

  const hapiPlugins = [
    // inert is used to serve asset files both in prod and dev
    inert
  ]

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
        // serving both public and build folders
        path: [path.join(__dirname, '../assets'), path.join(__dirname, '../build') ],
        redirectToSlash: true,
      }
    }
  });

  // Include api routes
  server.route(api);

  // get generated assets name(s) and make sure it's an array of strings
  const rawWebpackAssets = stats.main
  const webpackAssets = []
  Object.keys(rawWebpackAssets).forEach(function(id) {
    webpackAssets.push(`${rawWebpackAssets[id]}`)
  });

  // Anything else gets passed to the client app's server rendering
  server.ext('onPreResponse', function(request, reply) {

    // the 'onPreResponse' hook will catch all request therefore we need
    // to prevent it from messing with inert serving static files...
    // should we have one build and one public folders ? or better to have a nested
    // public folder ?
    // this doesn't look really clean : todo find a better way
    if (request.path.length >= 4 && request.path.substr(0, 4) === '/api') {
      reply.continue()
      return
    }
    if (request.path.length >= 7 && request.path.substr(0, 7) === '/public') {
      reply.continue()
      return
    }
    if (request.path.length >= 6 && request.path.substr(0, 6) === '/build') {
      console.log("going to build");
      reply.continue()
      return
    }

    // generate html depending on route and serve it to the client
    return require('../client/server-render')(request.path, webpackAssets, function(err, page) {
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

}
