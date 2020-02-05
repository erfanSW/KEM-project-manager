import Api from "./Api";

function login(user) {
  console.log(user.email + " " + user.password)
  return Api().post('account/login',{
    email: user.email,
    password: user.password
  })
}

function logout(token) {
  return Api().get('account/logout',{
    Authorization: 'Token ' + token
  })
}


export default {
  login,
  logout,
}
