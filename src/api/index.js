import Login from '../pages/Login'
import axios from '../utils/request'
const api={
    register(params){
        return axios.post('/register',params)
    },
    login(params){
        return axios.post('/login',params)
    },
    getArticle(params){
        return axios.get('/article',{params})
    },
    addArticle(params){
        return axios.post('/article/add', params)
    },
    searchArticle(params){
        return axios.get(`/article/${params.id}`)
    },
    updateArticle(params){
        return axios.put('/article/update',params)
    },
    delArticle(params){
        return axios.post('/article/remove',params)
    },
    getUserData(params){
        return axios.get('/info')
    },
    changeUserData(params){
        return axios.put('/info',params)
    }
}
export default api