import AuthenticationService from "../services/AuthenticationService";

function login(user) {
  AuthenticationService
    .login(user)
    .then((res) => {
      // do state stuff
      console.log(res)
    })
    .catch((error) => {
      console.log(error.response)
    })
}

function logout() {
  AuthenticationService
    .logout()
    .then((res) => {
      //do logout stuff
    })
    .catch((error) => {
      //
    })
}

export default {
  login,
  logout
}
