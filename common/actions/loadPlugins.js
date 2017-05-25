import TYPES from '../constants/types';
// import IS_BROWSER from '../constants/environment'

function receivePlugins(plugins) {
  return {
    type: TYPES.API_FETCH,
    plugins
  };
}

function stopFetching() {
  return {
    type: TYPES.API_STOP_FETCH
  }
}

function shouldFetchPlugins(state) {
  const plugins = state.app.plugins;
  console.log("state": plugins, state);
  console.log("plugins length:, ", plugins.length, " \n,isLoading: ", state.app.isLoading);
  console.log("should fetch: ", (plugins.length === 0 && !state.app.isLoading));
  return plugins.length === 0 && !state.app.isFetching;
}


function fetchPlugins() {
  return dispatch => {
    dispatch({
      type: TYPES.API_REQUEST
    })
    return new Promise(function(resolve) {
      resolve({
        "is": "plugins"
      });
    }).then((res) => {
      console.log("res", res);
        dispatch(stopFetching());
        return res;
    }).then((res) => {
      dispatch(receivePlugins(res));
    })
  }
}

export default function fetchPluginsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPlugins(getState())) {
      return dispatch(fetchPlugins())
    }
  };
}
