/*
export function someAction (context) {
}
*/

export function login({commit},user,token) {
  commit('login',user,token)
}

export function logout({commit}) {
  commit('logout')
}
