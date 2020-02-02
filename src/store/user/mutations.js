/*
export function someMutation (state) {
}
*/
export function login(state,user,token) {
  state.user = user
  state.token = token
  state.isUserLoggedIn = true
}

export function logout(state) {
  state.user = null
  state.token = null
  state.isUserLoggedIn = false
}
