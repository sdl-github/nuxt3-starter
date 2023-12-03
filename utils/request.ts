import axios, { AxiosError } from 'axios'
import { message } from 'ant-design-vue'
import { getToken } from './auth'

export const baseURL = 'https://worker.jsto.top/api'
export const embedUrl = 'https://embed.jsto.top'
// export const baseURL = 'http://localhost:8787/api'
const instance = axios.create({
  baseURL,
  // timeout: 5000
  withCredentials: false,
})

instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (getToken())
      config.headers!.Authorization = `${getToken()}` as string

    return config
  },
  (error) => {
    // do something with request error
    console.log(`Error: ${error.message}`) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const resp = response.data
    if (resp.code === 200)
      return resp.data

    return resp
  },
  (error) => {
    console.error(error)
    const userStore = useUserStore()

    let msg
    if (error instanceof AxiosError) {
      msg = ((error as AxiosError).response?.data as any).message
      if ((error as AxiosError).response?.status === 401) {
        msg = '登录已经过期，请重新登录'
        userStore.logout()
      }
    }
    message.error(msg || error.message)
    throw error
  },
)
export default instance
