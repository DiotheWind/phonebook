import axios from 'axios'
const serverURL = 'http://localhost:3001/persons'

const getNames = () => {
    const promise = axios.get(serverURL)
    return promise.then(response => response.data)
}

const updateServer = (personObj) => {
    const promise = axios.post(serverURL, personObj)
    return promise.then(response => response.data)
}

export default { getNames, updateServer }
