import { DELETE, PATCH, POST, PUT } from '@common/constants/reactQueryKeys'
import { MutationRequestConfig, RailsErrorResponseData } from '@common/types'
import axios, { AxiosResponse, CancelToken } from 'axios'
import humps from 'humps'
import { LOCAL_IP_ADDR } from '@env';

interface Options {
  isAuth?: boolean
  cancelToken?: CancelToken
}

const parseSnakeToCamel = (obj: object): object => {
  return humps.camelizeKeys(obj)
}

const getBackendUrl = () => {
  return process.env.NODE_ENV === 'development' ? `http://${LOCAL_IP_ADDR}/` : ''
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

export const axiosInstance = (options?: Options) => {
  const isAuth = options ? options.isAuth : false
  const apiConfig = isAuth ? getAuthApiConfig() : getApiConfig()
  const configWithCancelToken = { ...apiConfig, cancelToken: options?.cancelToken }
  const instance = axios.create(configWithCancelToken)

  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(response)
        console.log(parseSnakeToCamel(response))
      }
      return response
    },
    (error) => {
      return Promise.reject(error.response)
    }
  )

  return instance
}

export const genMutationAxiosRequest = <T>({
  method,
  url,
  params,
  config
}: MutationRequestConfig & any): Promise<AxiosResponse<T>> | null => {
  switch(method){
    case POST:
      return axiosInstance().post(url, params, config)
    case PATCH:
      return axiosInstance().patch(url, params, config)
    case PUT:
      return axiosInstance().put(url, params, config)
    case DELETE:
      return axiosInstance().delete(url)
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
  const instance = axiosInstance(options)

  try {
    const res = await instance.get(path, { params: query })
    return res
  } catch (error) {
    return error
  }
}

// TODO: 引き継いだが、必要か要検討
// export const getErrorList = (errorsData: RailsErrorResponseData) => {
//   const railsErrors = errorsData.data.errors
//   const attributes = Object.keys(railsErrors)
//   const attributesErrors = attributes.map((attribute) => {
//     return {attribute: attribute, msgParts: railsErrors[0]}
//   })
//   return attributesErrors
// }