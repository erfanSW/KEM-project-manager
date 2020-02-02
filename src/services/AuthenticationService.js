import Api from "./Api";

function login(user) {
  return Api().get('account/login',{
    data: {
      username: user.username,
      password: user.password
    }
  })
}

function logout() {
  return Api().get('account/logout',{
    Authorization: 'Token ' + this.$store.getters['user/getToken']
  })
}


export default {
  login,
  logout,
}
