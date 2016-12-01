import configureStore from './store';
// import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes.js';

// eslint-disable-next-line no-sync
// const template = fs.readFileSync(__dirname + '/../index.html', 'utf8');

function renderApp(path, assets, callback) {

  // check the requested route against react-router available routes
  match({routes, location : path},
    (error, redirectLocation, renderProps) => {

      // todo need to handle redirection and erros here
      if (redirectLocation) {
        callback({ err : "redirect", args : redirectLocation.pathname + redirectLocation.search }, null);
        return;
      }
      if (error || !renderProps) {
        callback({err : "continue"}, null);
        return;
      }

      // Initiate a new redux store (on each request)
      const store = configureStore();
      const state = store.getState();

      const rendered = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const browserEnv = {env : { BROWSER : true, REDUX_LOGGER : true }};
      const page = `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Wabba luba dup dup</title>

            ${
                assets
                .filter(path => path.endsWith('.css'))
                .map(path => `<link rel="stylesheet" href="${path}" />`)
            }

          </head>
          <body>

            <div id="root">${rendered}</div>

            <script type="text/javascript">
              window.process = ${JSON.stringify(browserEnv)}
              window.REDUX_INITIAL_STATE = ${JSON.stringify(state)}
            </script>

            ${
                assets
                .filter(path => path.endsWith('.js'))
                .map(path => `<script src="/${path}"></script>`)
            }

          </body>
        </html>
      `;

      callback(null, page);

    });
}

module.exports = renderApp;
