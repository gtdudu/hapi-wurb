<!-- import TYPES from '../constants/types';
// import IS_BROWSER from '../constants/environment'

function receivePlugins(plugins) {
  return {
    type: TYPES.API_FETCH,
    plugins,
    lol: 'lol',
  };
}

function stop() {
  return {
    type: TYPES.API_STOP_FETCH
  }
}



function fetchPlugins() {
  return dispatch => {
    dispatch({
      type: TYPES.API_REQUEST
    })
    return new Promise(resolve => {
      resolve({
        is: "plugins",
      });
    }).then(res => {
      console.log("res", res);
        dispatch(stop());
        return res;
    }).then(res => {
      dispatch(receivePlugins(res));
    })
  }
}

// before hook
const beforeHook = state => {
  const plugins = state.app.plugins;
  return plugins.length === 0 && !state.app.isFetching;
}

// before hook
// const afterHook = state => {
//   const plugins = state.app.plugins;
//   return plugins.length === 0 && !state.app.isFetching;
// }

// entry point for chain of action
const doStuff = () => {
  return (dispatch, getState) => {
    if (beforeHook(getState())) {
      return dispatch(fetchPlugins())
    }
  };
}

export default doStuff; -->
