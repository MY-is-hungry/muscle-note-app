import { DELETE, PATCH, POST, PUT } from '@common/constants/reactQueryKeys';
import { MutationRequestConfig } from '@common/types';
import { LOCAL_IP_ADDR } from '@env';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import humps from 'humps';
import { firebaseAuth } from './firebase';

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

export const getApiConfig = () => {
  const backendUrl = getBackendUrl()
  return {
    baseURL: `${backendUrl}api/v1/`,
    timeout: 5000,
    withCredentials: true,
    headers: {
      "ContentType": 'application/json',
      "Accept": 'application/json',
      "Access-Control-Allow-Origin": "*",
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${firebaseAuth?.currentUser?.uid}`,
    },
  }
}

const getAuthApiConfig = () => {
  const backendUrl = getBackendUrl()
  return {
    baseURL: backendUrl,
    timeout: 5000,
    headers: {
      ContentType: 'application/json',
      Accept: 'application/json',
      // 'access-token': authInfo().Token,
      // client: authInfo().Client,
      // uid: authInfo().Uid,
    },
  }
}

export const createAxiosInstance = (options?: Options) => {
  const isAuth = options ? options.isAuth : false
  const apiConfig = isAuth ? getAuthApiConfig() : getApiConfig()
  const instance = axios.create(apiConfig)

  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(parseSnakeToCamel(response))
      }
      return parseSnakeToCamel(response)
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
  const axiosInstance = createAxiosInstance()
  return axiosInstance.get(url, config).then((res) => res.data)
}

export const genMutationAxiosRequest = <T>({
  method,
  url,
  params,
  config
}: MutationRequestConfig & any): Promise<AxiosResponse<T>> | null => {
  switch(method){
    case POST:
      return createAxiosInstance().post(url, params, config)
    case PATCH:
      return createAxiosInstance().patch(url, params, config)
    case PUT:
      return createAxiosInstance().put(url, params, config)
    case DELETE:
      return createAxiosInstance().delete(url)
    default:
      return null
  }
}

export const fetch = async (
  // '例: /api/v1/~'
  path: string,
  query?: Object,
  options?: Options
) => {
  const instance = createAxiosInstance(options)

  try {
    const res = await instance.get(path, { params: query })
    return res
  } catch (error) {
    return error
  }
}