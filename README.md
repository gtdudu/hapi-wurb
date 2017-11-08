Isomorphic starterkit with server-side React rendering using npm, webpack, webpack-dev-middleware, webpack-hot-middleware, react-transform-hmr, hapi, babel, react, react-router, redux, redux-devtools-extension, react-router-redux, sass, lodash redis, mongo.

# Starter kit universal react redux

  * Only one running node process ✅
  * Client-side Redux reducer hot reloading ✅
  * Server-side Redux reducer hot reloading ✅
  * Client-side React component hot reloading ✅
  * Server-side React component hot reloading ✅
  * Restart server on server api file modification ✅
  * Client side [css-modules](https://github.com/css-modules/css-modules) hot reloading ✅
  * Using mostly ES6 module syntax, except where dynamic loading is required ✅
  * Set up with react-router, hapi and redux

## Install

```
git clone https://github.com/gtdudu/hapi-wurb.git
cd hapi-wurb && npm install
cp ./server/.env_template .env_dev
cp ./server/.env_template .env_prod
cp ./server/.env_template .env_test
```

fill up .env file with your info

## Env

You can find and tweak environment variables in the config folder. Whenever you run the application the correct environment will be loaded depending on your current process.env.NODE_ENV.
This defaults to development and can also be production and test.

Mandatory env variables:
- Redis (host, port and secret)
- Mongo (host, port, name and secret)
- MailGun (domain and api key)
- Facebook (id and secret)

## Logs

Configure output levels via env variable DEBUG.
Available option are:
- app
- webpack


## Run

### PRE REQUISITE

Mongo and redis need to be running:
```
npm run mongo
npm run redis
```

  * Development mode

```
npm start
// then visit `http://localhost:8000/`
```

* Production mode

```
npm run build
npm run prod
// then visit `http://localhost:8000/`
```

## Lint

```
npm run lint
```

## Fetching Data

Redux actions must be plain objects, but redux-thunk allows us to return promises.
If you want to hydrate your state server side, you need to declare a static function called fetchData in your components
that returns a dispatch(promise).

When all fetchData functions for a given route are resolved, then the server can reply.

Example : Index component

```
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchShowsNeeded } from '../../actions/show.js';

export class Index extends Component {

  static fetchData({ dispatch }) {
    return dispatch(fetchShowsNeeded())
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.shows.length === 0) {
      Index.fetchData({ dispatch });
    }
  }
  ...

```


## Inspiration

  *  [glenjamin/ultimate-hot-reloading-example](https://github.com/glenjamin/ultimate-hot-reloading-example)
  *  [60frames/react-boilerplate](https://github.com/60frames/react-boilerplate/tree/master/common)
  *  [raquo/minimal-hapi-react-webpack](https://github.com/raquo/minimal-hapi-react-webpack)
