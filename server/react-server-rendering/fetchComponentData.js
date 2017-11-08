// import Debug from 'debug'
//
// /**
//  * Debug.
//  *
//  * @type {Function}
//  */
//
// const debug = Debug('sequence:utils:')

/*
** Gather all data relative to component's tree for the requested route
*/
import _ from 'lodash';

function aggregateFetchData(item) {
  const result = [];
  function iter(r) {
    if (r && r.type && r.type.fetchData) {
      result.push(r.type.fetchData);
    }

    if (r && r.props && r.props.children) {
      if (_.isArray(r.props.children)) {
        return r.props.children.forEach(x => iter(x))
      }
      return iter(r.props.children)
    }
  }
  iter(item);
  return result;
}

//   if (_.isArray(elem)) {
//     return aggregateFetchData()
//   }
//
//   props.children
//   props.children.type.fetchData
//
//     // Is this element a Component?
//   if (typeof element.type === 'function') {
//     const Component = element.type
//     const props = Object.assign({}, Component.defaultProps, element.props)
//
//     // Is this a class component? (http://bit.ly/2j9Ifk3)
//     const isReactClassComponent =
//       Component.prototype &&
//       (Component.prototype.isReactComponent || Component.prototype.isPureReactComponent)
//
//     if (isReactClassComponent) {
//
// }

export default function fetchComponentData(renderProps, store, token) {
  const filteredComponents = renderProps
  	.components
    .filter(component => component !== undefined);

    if (token) {
      const LOGIN_SUCCESS = "LOGIN_SUCCESS";

      const loginSuccess = token => {
        return {
          type: LOGIN_SUCCESS,
          token
        };
      }

      store.dispatch(loginSuccess(token))
    }

    const hold = [];

  _.each(filteredComponents, component => {
    console.log(component);
    const allFetchData = _.isFunction(component) && !component.WrappedComponent ?
        aggregateFetchData(component()) :
        aggregateFetchData(component);

    const { query, params, history } = renderProps;

    _.forEach(allFetchData, func => {
      hold.push(func({
        dispatch: store.dispatch,
        query,
        params,
        history,
        token,
      }))
    });
  });


  if (!_.isArray(hold) || !_.isArray(hold[0])) {
    return Promise.resolve();
  }

  return Promise.all(hold[0])
    .then(() => {
      return
    })
    .catch(err => {
      console.log("error: fetchComponentData after all", err);
      return
     })
  ;
}
