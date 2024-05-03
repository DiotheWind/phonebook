import axios from 'axios'
const serverURL = 'http://localhost:3002/api/persons'

const getNames = () => {
    const promise = axios.get(serverURL)
    return promise.then(response => response.data)
}

const updateServer = (personObj) => {
    const promise = axios.post(serverURL, personObj)
    return promise.then(response => response.data)
}

const deleteName = (id) => {
    const promise = axios.delete(`${serverURL}/${id}`)
    return promise.then(response => response.data)
}

export default { getNames, updateServer, deleteName }
