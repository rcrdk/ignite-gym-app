import { AppError } from '@utils/AppError'
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://192.168.1s.5:3333',
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const errorMessage = new AppError(error.response.data.message)
      return Promise.reject(errorMessage)
    }

    return Promise.reject(error)
  },
)

export { API }
