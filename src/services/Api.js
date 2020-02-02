import axios from 'axios'

export default () => {
  return axios.create({
      baseURL: 'https://promanback.herokuapp.com/api/v1/'
  })
}
