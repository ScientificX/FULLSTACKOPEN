import react from 'react'
import axios from 'axios'

const baseUrl = "/api/person/"

const getAll = () => {

    const request = axios.get(baseUrl)

    return request.then( res => res.data)
}

const create = (object) => {

    const request = axios.post(baseUrl,object)

    return request.then( res => res.data )
}

const update = (id) => {

    const request = axios.delete(`${baseUrl}/${id}`, { params: { id: id } })
    return request.then(res => res.data)
}

const replace = (id,object) =>{
    const request = axios.put(`${baseUrl}/${id}`, object )
    return request.then( res => res.data  )
    
}

export default {getAll, create, update, replace}
