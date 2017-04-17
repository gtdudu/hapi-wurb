import fetch from 'isomorphic-fetch';

import {
  API_FETCH, API_REQUEST,
  API_STOP_FETCH
} from './actionTypes';

let testApi = "http://api.tvmaze.com";
if (process.env.BROWSER === true) {
  // eslint-disable-next-line no-undef
  const { protocol, hostname, port } = window.location;
  testApi = `${protocol}//${hostname}:${port}/api/tvmaze`;
}

function receiveShows(fetchedShows) {
  return {
    type: API_FETCH,
    fetchedShows
  };
}

function stopFetching() {
  return {
    type: API_STOP_FETCH
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
      type: API_REQUEST
    })
    return fetch(testApi + "/shows")
    .then((response) => response.json())
    .then((body) => {
      if (!body || !body.length) {
        dispatch(stopFetching());
        return
      }
      const fetchedShows = body.map(({ id, name }) => ({ id, name }));
      dispatch(receiveShows(fetchedShows));
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
