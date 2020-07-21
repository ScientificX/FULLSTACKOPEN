import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
// if (token != null){
//   axios.defaults.headers.common['Authorization'] = token;
// }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (newObject, id) => {
  const config = {
    headers: {Authorization: token}
  }
  
	const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
	return response.data
}

const deletes = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config, id)
  return response.data
}

export default { getAll, create, setToken, update, deletes }