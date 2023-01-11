import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(err => console.log(err))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data).catch(err => console.log(err))
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data).catch(err => console.log(err))
}

export default {getAll, create, update, remove}