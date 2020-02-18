import Api from "./Api";
import store from '../store/index'


function signup(user) {
  console.log(user.email + " " + user.password)
  return Api().post('account/signup/',{
    email: user.email,
    password: user.password
  })
}

function login(user) {
  console.log(user.email + " " + user.password)
  return Api().post('account/login/',{
    email: user.email,
    password: user.password
  })
}

function logout() {
  console.log(store().getters['account/token'])
  return Api().get('account/logout/',{
    Authorization: 'Token ' + store().getters['account/token']
  })
}


export default {
  login,
  logout,
  signup
}
