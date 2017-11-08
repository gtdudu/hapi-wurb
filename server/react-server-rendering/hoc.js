import React, {Component, PropTypes} from 'react';
import { compose } from 'redux';
// import { connect } from "react-redux";

/**
 * High order Component to request data load before rendering
 * Has 2 props as params - fetch and defer.
 * fetch - will be called both on client and server.
 * It is your responsibility to make only server call or both.
 * defer - will be called only on client side.
 * @param  {Promise|array[Promise]} fetch - promise(s) to resolve on server and client
 * @param  {Promise|array[Promise]} defer - promise(s) to resolve on client
 */
const pure = ({fetch, defer}) => WrappedCompontent =>
class Prefetch extends Component {
  static contextTypes = {
    store: PropTypes.object, // Redux store.
    serverFetchPromises: PropTypes.array
  };

  displayName = 'Prefetch';

  constructor(props, context) {
    super(props, context);
    const {serverFetchPromises, store} = context;
    // only server should set serverFetchPromises
    // if this one exists then we fetch will called twice
    if (serverFetchPromises && typeof fetch === 'function') {
      const all = [].concat(fetch(props, store));
      all.forEach(p => p && serverFetchPromises.push(p));
    }
  }

  componentDidMount() {
    const {serverFetchPromises, store} = this.context;
    const promises = serverFetchPromises || [];
    // making sure promises are resolved
    // so call fetch again on client side, since server may fail some
    if (typeof fetch === 'function') {
      const all = [].concat(fetch(this.props, store));
      all.forEach(p => p && promises.push(p));
    }

    // only client call data will happen.
    // still going to add to general collection for consistency
    if (typeof defer === 'function') {
      const all = [].concat(defer(this.props, store));
      all.forEach(p => p && promises.push(p));
    }
  }


  render() {
    return (<WrappedCompontent {...this.props}/>);
  }
};

pure.propTypes = {
  fetch: React.PropTypes.func,
  defer: React.PropTypes.func
};

const hoc = compose(
  pure({
    fetch: ({pathname, load, hasLoaded}) =>
      (hasLoaded ? Promise.resolve() : load(pathname)),
    defer: () => []
  }));

const Test = () => (<div>fzeaihfiuzaehfa</div>)

export default hoc(Test);
