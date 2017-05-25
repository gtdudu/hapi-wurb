import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../common/routes.js';
import configureStore from '../../common/store';
import fetchComponentData from './fetchComponentData';


export default function renderApp(path, assets, callback) {

  // check the requested route against react-router available routes
  match({routes, location : path},
    (error, redirectLocation, renderProps) => {

      // todo need to handle redirection and erros better here
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

      // dispatch all actions for this route and THEN reply
      fetchComponentData(renderProps, store).then(() => {

        // now that we dispatched all actions we can get the initial state
        const state = store.getState();

        // render to string all all components for this route
        const rendered = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        // custom browser variables
        const browserEnv = {env : { BROWSER : true, REDUX_LOGGER : process.env.REDUX_LOGGER }};

        // build response
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
                  .map(path => `<script src="${path}"></script>`)
              }

            </body>
          </html>
        `;

        callback(null, page);

      }).catch((err) => {
        callback(err, null)
      })
    });
}
