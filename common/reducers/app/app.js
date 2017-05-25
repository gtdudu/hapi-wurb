import TYPES from '../../constants/types';

function app(state = {
  plugins: [],
  shows: [],
  listShows : [],
  nextPage: 1,
  pagesToFetch: 2,
  isLoading: false,
  isFetching: false,
}, action) {
  switch (action.type) {
  case TYPES.API_FETCH:
    return Object.assign({}, state, {
      plugins: state.plugins.concat(action.fetchedPlugins),
      yolo : action.lol,
      nextPage: state.nextPage + 1,
      pagesToFetch: state.pagesToFetch - 1
    })
  case TYPES.API_REQUEST:
    return Object.assign({}, state, {
      isLoading: true,
      isFetching: true,
    })
  case TYPES.API_STOP_FETCH:
    return Object.assign({}, state, {
      pagesToFetch: 0,
      isLoading: false,
      isFetching: false,
    })
  default:
    return state;
  }
}

export default app
