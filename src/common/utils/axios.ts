import axios, { CancelToken } from 'axios'
import humps from 'humps'

interface Options {
  isAuth?: boolean
  cancelToken?: CancelToken
}

export const parseSnakeToCamel = (obj: object): object => {
  return humps.camelizeKeys(obj)
}

const getBackendUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''
}

const getApiConfig = () => {
  const backendUrl = getBackendUrl()
  return {
    baseURL: `${backendUrl}api/v1/`,
    timeout: 5000,
    // mode: 'cors',
    // credentials: 'include',
    withCredentials: true,
    headers: {
      "ContentType": 'application/json',
      "Accept": 'application/json',
      "Access-Control-Allow-Origin": "*",
      'X-Requested-With': 'XMLHttpRequest',
    },
  }
}
const getAuthApiConfig = () => {
  const backendUrl = getBackendUrl()
  return {
    baseURL: backendUrl,
    timeout: 5000,
    // mode: 'cors',
    // credentials: 'include',
    headers: {
      ContentType: 'application/json',
      Accept: 'application/json',
      // 'access-token': authInfo().Token,
      // client: authInfo().Client,
      // uid: authInfo().Uid,
    },
  }
}

const axiosInstance = (options?: Options) => {
  const isAuth = options ? options.isAuth : false
  const apiConfig = isAuth ? getAuthApiConfig() : getApiConfig()
  const configWithCancelToken = { ...apiConfig, cancelToken: options?.cancelToken }
  const instance = axios.create(configWithCancelToken)

  instance.interceptors.response.use(
    response => {
      if (process.env.NODE_ENV === 'development') {
        console.log(response)
      }
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  return instance
}

export const fetch = async (
  // '例: /api/v1/~'
  path: string,
  query?: Object,
  options?: Options
) => {
  const instance = axiosInstance(options)

  try {
    const res = await instance.get(path, { params: query })
    return res
  } catch (error) {
    return error
  }
}