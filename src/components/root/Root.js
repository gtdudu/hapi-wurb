import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../../routes.js';

export class Root extends Component {
	//
	// constructor(props) {
	// 	super(props)
	// }
	//
  render() {
	  const { store, history } = this.props
	  return (
	      <Provider store={store}>
	          <Router history={history} routes={routes} />
	      </Provider>
	  )
  }

}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
