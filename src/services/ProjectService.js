import Api from './Api'

export default {
    get(token) {
      return Api().get('projects',{
        headers: {
          Authorization: "Token " + token
        }
      })
    },
    post(data,token) {
      return Api().post('projects/',data,{
        headers: {
          Authorization: "Token " + token
        }
      })
    },
}
