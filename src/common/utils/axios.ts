import { LOCAL_IP_ADDR } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import humps from 'humps';
import { firebaseAuth, getJwt, getPromiseJwt } from './firebase';

interface Options {
  isAuth?: boolean
}

export const parseSnakeToCamel = (obj: object): object => {
  return humps.camelizeKeys(obj)
}

// TODO: 開発環境以外のURL設定
const getBackendUrl = () => {
  return process.env.NODE_ENV === 'development' ? `http://${LOCAL_IP_ADDR}:3000/` : ''
}

export const createAxiosInstance = (idToken: string, options?: Options) => {
  // const isAuth = options ? options.isAuth : false
  const backendUrl = getBackendUrl()
  const apiConfig = {
    baseURL: `${backendUrl}api/v1/`,
    timeout: 5000,
    withCredentials: true,
    headers: {
      "ContentType": 'application/json',
      "Accept": 'application/json',
      "Access-Control-Allow-Origin": "*",
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${idToken}`,
    },
  }
  const instance = axios.create(apiConfig)

  instance.interceptors.response.use(
    (response) => {
      const camelRes = parseSnakeToCamel(response)
      if (process.env.NODE_ENV === 'development') {
        console.log(camelRes)
      }
      return camelRes
    },
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(parseSnakeToCamel(error))
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const idToken = await getPromiseJwt(firebaseAuth.currentUser)
  const axiosInstance = createAxiosInstance(idToken, {})
  return axiosInstance.get(url, config).then((res) => res.data)
}

export const postRequest = async <T>(url: string, params: any, config?: AxiosRequestConfig): Promise<T> => {
  const idToken = await getPromiseJwt(firebaseAuth.currentUser)
  const axiosInstance = createAxiosInstance(idToken, {})
  return axiosInstance.post(url, params, config).then((res) => res.data)
}

export const patchRequest = async <T>(url: string, params: any, config?: AxiosRequestConfig): Promise<T> => {
  const idToken = await getPromiseJwt(firebaseAuth.currentUser)
  const axiosInstance = createAxiosInstance(idToken, {})
  return axiosInstance.post(url, params, config).then((res) => res.data)
}

// export const fetch = async (
//   // '例: /api/v1/~'
//   path: string,
//   query?: Object,
//   options?: Options
// ) => {
//   const instance = createAxiosInstance(options)

//   try {
//     const res = await instance.get(path, { params: query })
//     return res
//   } catch (error) {
//     return error
//   }
// }