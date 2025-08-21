import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Authorization: import.meta.env.VITE_SERVER_KT },
})

instance.interceptors.request.use(
  (config) => config,
  (err) => {
    console.error('Request Error:', err.response?.data || err.message)
    return Promise.reject(err)
  },
)

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('Response Error:', err.response?.data || err.message)
    return Promise.reject(err)
  },
)

export default instance
