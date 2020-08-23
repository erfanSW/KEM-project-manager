import Api from "./Api";
import axios from "axios";


function signup(user) {
  return axios.post('http://51.195.19.165:9090/api/v1/signup/', {
    email: user.email,
    password: user.password
  })
}

function login(user) {
  return axios.post('http://51.195.19.165:9090/api/v1/login/', {
    email: user.email,
    password: user.password
  })
}

function logout(token) {
  return Api().get('account/logout/')
}


export default {
  login,
  logout,
  signup
}
