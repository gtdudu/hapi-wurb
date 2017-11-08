// import CATEGORIES from '../constants/categories.js';
// import allCategories from '../fixtures/categories.js';
//
// // import IS_BROWSER from '../constants/environment'
//
// function receiveCategories(categories) {
//   return {
//     type: CATEGORIES.RECEIVE,
//     categories,
//   };
// }
//
// function failedToRetrieveCategorie(error) {
//   return {
//     type: CATEGORIES.ERROR,
//     error,
//   }
// }
//
// function shouldFetchCategories(state) {
//   const categories = state.app.categories;
//   return categories.length === 0 && !state.app.isFetching;
// }
//
//
// function fetchCategories() {
//   return dispatch => {
//     dispatch({
//       type: CATEGORIES.FETCH,
//     })
//     return new Promise(resolve => {
//         resolve(allCategories);
//       })
//       .then(res => dispatch(receiveCategories(res)))
//       .catch(err => dispatch(failedToRetrieveCategorie(err)))
//     ;
//   }
// }
//
// export default function fetchCategoriesIfNeeded() {
//   return (dispatch, getState) => {
//     if (shouldFetchCategories(getState())) {
//       return dispatch(fetchCategories())
//     }
//   };
// }
