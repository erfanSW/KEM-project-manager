import axios from 'axios'
import {Cookies} from "quasar";

export default () => {
  return axios.create({
    baseURL: 'https://promanback.herokuapp.com/api/v1/',
    headers: {
      Authorization: 'Token ' + Cookies.get('token')
    }
  })
}
