import {
  API_FETCH, API_REQUEST,
  API_STOP_FETCH
} from '../../actions/actionTypes';

function app(state = {
  shows: [],
  listShows : [],
  nextPage: 1,
  pagesToFetch: 2,
  isLoading: false
}, action) {
  switch (action.type) {
  case API_FETCH:
    return Object.assign({}, state, {
      shows: state.shows.concat(action.fetchedShows),
      nextPage: state.nextPage + 1,
      pagesToFetch: state.pagesToFetch - 1
    })
  case API_REQUEST:
    return Object.assign({}, state, {
      isLoading: true
    })
  case API_STOP_FETCH:
    return Object.assign({}, state, {
      pagesToFetch: 0,
      isLoading: false
    })
  default:
    return state;
  }
}

export default app
