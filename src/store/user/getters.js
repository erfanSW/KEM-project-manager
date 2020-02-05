/*
export function someGetter (state) {
}
*/
export function token(state) {
  return state.token
}

export function isUserLoggedIn(state) {
  return state.isUserLoggedIn
}

export function user_id(state) {
  return state.user.id
}
