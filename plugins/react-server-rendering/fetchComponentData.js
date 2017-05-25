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

export default function fetchComponentData(renderProps, store) {
  const requests = renderProps
  	.components
    .filter(component => component)
    .map(component => {
      // Handle connected components.
      if (component.WrappedComponent) {
        component = component.WrappedComponent;
      }

      // Check if component need preloaded data
      if (component.fetchData) {
        const { query, params, history } = renderProps;
        // dispatch action to get load data
        return component.fetchData({
          dispatch: store.dispatch,
          query,
          params,
          history
        })
        .catch((err) => {
          console.log("ERROR: component.fetchData: ", err)
        });
        // Make sure promise always successfully resolves

      }
    });
  return Promise.all(requests);
}
