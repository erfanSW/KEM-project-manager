/*
export function someMutation (state) {
}
*/
export function login(state,data) {
  console.log(data)
  state.user = data.user
  state.token = data.token
  state.isUserLoggedIn = true
}

export function logout(state) {
  state.user = null
  state.token = null
  state.isUserLoggedIn = false
}
