import axios, { AxiosError, type AxiosResponse } from 'axios'
import dbData from '../../db.json'

const mockDb = { ...dbData } as Record<string, any[]>

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK' && error.config) {
      const config = error.config
      const method = config.method?.toLowerCase()
      if (method === 'get') {
        console.warn(
          '[Mock API Fallback] Server unreachable. Using local db.json',
        )
        const urlPath = config.url?.replace(/^\//, '').split('?')[0] || ''
        const collectionName = urlPath.split('/')[0]

        if (collectionName && mockDb[collectionName]) {
          const collection = mockDb[collectionName]
          return Promise.resolve({
            data: collection,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          } as AxiosResponse)
        }
      }
    }

    return Promise.reject(error)
  },
)

export default api
