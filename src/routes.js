import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app/App.js'
import Index from './components/index/Index.js'
import SandBox from './components/sandbox/SandBox.js'
import NotFound from './components/notfound/NotFound.js'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="index" component={Index} />
    <Route path="sandbox" component={SandBox} />
    <Route path="*" component={NotFound} />
  </Route>
);
