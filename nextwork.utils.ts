import axios from 'axios'

const axiosMod = axios.create({
  baseURL: `${
    process.env.NODE_ENV === 'development' ? 'http://localhost:3005' : ''
  }/latest/api`,
  withCredentials: process.env.NODE_ENV !== 'development'
})

export default axiosMod
