import fetch from 'isomorphic-fetch';
import TYPES from '../constants/types';
// import IS_BROWSER from '../constants/environment'

let testApi = "http://api.tvmaze.com";

function receiveShows(fetchedShows, body) {
    console.log("Shows", testApi);
  return {
    type: TYPES.API_FETCH,
    fetchedShows,
    lol: body,
  };
}

function stopFetching() {
  return {
    type: TYPES.API_STOP_FETCH
  }
}

function shouldFetchShows(state) {
  const shows = state.app.shows;
  console.log("shouldFetchShows : ", !(shows.length || state.app.isFetching));
  return !(shows.length || state.app.isFetching);
}


function fetchShows() {
  return dispatch => {
    dispatch({
      type: TYPES.API_REQUEST
    })
    return fetch(testApi + "/shows")
    .then((response) => response.json())
    .then((body) => {
      if (!body || !body.length) {
        dispatch(stopFetching());
        return;
      }
      const fetchedShows = body.map(({ id, name }) => ({ id, name }));
      dispatch(receiveShows(fetchedShows, body));
    })
    .catch((error) => {
      console.error("error : ", error);
    })
  }
}

export function fetchShowsNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchShows(getState())) {
      return dispatch(fetchShows())
      // return Promise.all([dispatch(fetchShows()), dispatch(fetchShows())])
    }
  };
}
