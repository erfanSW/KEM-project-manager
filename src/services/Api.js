import axios from 'axios'

export default () => {
  return axios.create({
      baseURL: 'http://10.42.0.1:9000/api/v1/'
  })
}
