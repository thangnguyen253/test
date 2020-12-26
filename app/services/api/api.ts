import axios from "axios"
import * as Config from "./apiConfig"

axios.interceptors.request.use(
  (config) => {
    // Request headers
    const globalAny: any = global
    const accessToken = globalAny.rootStore.userStore.accessToken

    config.headers.Authorization = accessToken
    config.headers["Content-Type"] = "application/json"

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const globalAny: any = global
    // Handle response errors
    console.log(error)
    if (error.response.status === 401) globalAny.rootStore.userStore.signOut()
    return Promise.reject(error)
  },
)

export class Api {
  private static getFullUrl(url: string) {
    return Config.API_URL + url
  }

  static post(url: string, data: any = {}, config: any = {}) {
    return axios.post(Api.getFullUrl(url), JSON.stringify(data), config)
  }

  static put(url: string, data: any = {}) {
    return axios.put(Api.getFullUrl(url), JSON.stringify(data))
  }

  static patch(url: string, data: any = {}) {
    return axios.patch(Api.getFullUrl(url), JSON.stringify(data))
  }

  static get(url: string, config: any = {}) {
    return axios.get(Api.getFullUrl(url), config)
  }

  static delete(url: string) {
    return axios.delete(Api.getFullUrl(url))
  }
}
