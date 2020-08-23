import axios from 'axios'
import {Cookies} from "quasar";

export default () => {
  return axios.create({
    baseURL: 'http://51.195.19.165:9090/api/v1/',
    headers: {
      Authorization: 'Token ' + Cookies.get('token')
    }
  })
}
