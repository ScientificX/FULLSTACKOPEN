import react from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {

    const request = axios.get(baseUrl)

    return request.then( res => res.data)
}

const create = (object) => {

    const request = axios.post(baseUrl,object)

    return request.then( res => res.data )
}

const update = object => {

    const request = axios.put(baseUrl,object)
    return request.then(res => res.data)
}

export default {getAll, create, update}
