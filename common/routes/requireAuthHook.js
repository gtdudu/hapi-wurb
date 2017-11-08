const requireAuth = (store, nextState, replace) => {
  const state = store.getState()
  const token = state.auth._store.token
  if (token === "") {
    replace({
      pathname: '/login',
      query: { redirect: nextState.location.pathname || '/' }
    })
  }
}

export default requireAuth;
