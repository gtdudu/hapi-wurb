import hapi from 'hapi';
import inert from 'inert';
import * as api from './api';
import path from 'path'
import stats from "../build/assets.json"
import serverRender from './react-server-rendering';
import hapiAuthJwt2 from 'hapi-auth-jwt2'
// import authPlugin from './hapiPlugins/auth'
// import yarPlugin from './hapiPlugins/yar'


// checking NODE_ENV just to be safe...
if (process.env.NODE_ENV === "production") {
  const hapiPlugins = [
    // inert is used to serve asset files both in prod and dev
    inert,
    hapiAuthJwt2,         // use authentfication
    // authPlugin,           // use authentfication
    // yarPlugin,            // session cookie management

  ]

  // create hapi server;
  const server = new hapi.Server();

  // check process and connect server
  const host = process.env.HOST || "127.0.0.1"
  const port = process.env.HOST || 8000
  server.connection({host, port});


  // start server
  server.register(hapiPlugins, err => {
    console.log('registered');
    if (err) {
      console.log("err while regestering hapi plugins", err);
      throw err;
    }

    // inert config : serve public/assets folder with inert
    server.route({
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          // serving both public and build folders
          path: [path.join(__dirname, '../common/assets'), path.join(__dirname, '../build') ],
          redirectToSlash: true,
        }
      }
    });

    // Include api routes
    server.route(api.quotes);

    // get generated assets name(s) and make sure it's an array of strings
    const rawWebpackAssets = stats.main

    const webpackAssets = []
    Object.keys(rawWebpackAssets).forEach(id => {
      webpackAssets.push(`${rawWebpackAssets[id]}`)
    });

    console.log(webpackAssets);

    // Anything else gets passed to the client app's server rendering
    server.ext('onPreResponse', (request, reply) => {
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

      if (request.path.length === '/favicon.ico') {
        reply.continue()
        return
      }

      // generate html depending on route and serve it to the client
      return serverRender(request.path, webpackAssets)
        .then(page => {
          reply(page);
        })
        .catch(err => {
          if (err.err && err.err === "redirect") {
            return reply.redirect(err.args);
          }

          if (err.err === "continue") {
            return reply.continue();
          }

          return reply(err.stack);
        })
      ;
    })

    console.log(server.start);
    server.start(err => {
      console.log(err);
      console.log(`running at : ${server.info.uri}`);
    });
  });
}
