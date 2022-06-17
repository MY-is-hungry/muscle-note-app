import axios, { AxiosResponse } from "axios"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { useRecoilState } from "recoil"
import { initialErrorState, initialToastState } from "@common/recoil/atoms"
import { parseSnakeToCamel } from "@common/utils/axios"
import { isProduction } from "@common/utils/boolean"
import { MutationRequestConfig, RailsErrorResponseData, RailsResponse, TUseMutationOptions, TUseQueryOptions, UseMutationProps, UseQueryProps } from '@common/types'
import { DELETE, PATCH, POST, PUT } from "@common/constants/reactQueryKeys"
import { useRefresh } from "./useRefresh"

// TODO: 全体の型づけ

export const api = () => {
  const envBackendUrl = getEnvBackendUrl()
  const resultApi = axios.create({
    baseURL: `${envBackendUrl}api/v1/`, 
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${localStorage.customerId}`,
    }
  })
  resultApi.interceptors.response.use(
    (response) => {
      return Promise.resolve(parseSnakeToCamel(response))
    },
    (error) => {
      return Promise.reject({
        error: parseSnakeToCamel(error.response),
      })
    }
  )
  return resultApi
}

export const getEnvBackendUrl = () => {
  if (process.env.NEXT_PUBLIC_API_ORIGIN) return process.env.NEXT_PUBLIC_API_ORIGIN
  return process.env.NODE_ENV === 'development' ? '/rails/' : null
}

export const genMutationAxiosRequest = <T>({
  method,
  url,
  params,
  config
}: MutationRequestConfig & any): Promise<AxiosResponse<T>> | null => {
  switch(method){
    case POST:
      return api().post(url, params, config)
    case PATCH:
      return api().patch(url, params, config)
    case PUT:
      return api().put(url, params, config)
    case DELETE:
      return api().delete(url)
    default:
      return null
  }
}

/**
 * react queryを使う際にWrapする関数。アラートの登録など共通処理を書いておく
 * @param {string} queryKey - クエリのキー名
 * @param {QueryKey} deps - キー名を特定するための値
 * @param {UseQueryOptions} options - useQueryに渡すオプション
 * @param {Promise<AxiosResponse<T>>} axiosRequest - axiosを使ったAPIリクエスト
 * @returns
 */
export const useQueryWrapper = <T>({
  queryKey,
  deps = [],
  options,
  requestConfig
}: UseQueryProps<T>): UseQueryResult<T> => {
  const [errorState, setErrorState] = useRecoilState(initialErrorState)
  const queryKeyName = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey]
  const result = useQuery(
    queryKeyName,
    async () => {
      try {
        const res = await api().get(requestConfig.url)
        isProduction || console.log(res)
        // genMutationAxiosRequest({...requestConfig});
        return res.data
      } catch (err: any) {
        const railsError: RailsErrorResponseData = err.error
        isProduction || console.log(err)
        options?.onError && options.onError(err)
        // setErrorState(railsError?.data?.errors ? getErrorList(railsError) : [])
      }
    },
    options
  ) as UseQueryResult<T>;

  return result;
};

/**
 * react queryを使う際にWrapする関数。アラートの登録など共通処理を書いておく
 * @param {string} queryKey - クエリのキー名
 * @param {QueryKey} deps - キー名を特定するための値
 * @param {UseQueryOptions} options - useQueryに渡すオプション
 * @returns
 */
export const useMutationWrapper = <T>({
  queryKey,
  deps,
  options,
  requestConfig,
}: UseMutationProps<T>): UseMutationResult<any> => {
  const [errorState, setErrorState] = useRecoilState(initialErrorState)
  const refresh = useRefresh()

  // クエリのキー名
  const queryKeyName = Array.isArray(deps) ? [queryKey, ...deps] : [queryKey]
  // mutationが呼ばれた時に実行されるAPIリクエスト(axios)
  const mutationFunc = async (formValue: any): Promise<AxiosResponse<any, any> | any> => {
    return genMutationAxiosRequest({
      method: requestConfig.method, 
      url: requestConfig.url, 
      params: formValue,
      config: requestConfig.config
    })
  }

  const resultUseMutation = useMutation(
    mutationFunc,
    {
      mutationKey: queryKeyName,
      onMutate: async () => {
        options?.onMutate
        // mutationが実行されるたびにエラーとトーストをリセットする
        await refresh()
      },
      onSuccess: async (res: RailsResponse<any>) => {
        isProduction || console.log(res)
        options?.onSuccess && await options?.onSuccess(res, undefined, null)
      },
      onError: async (err: ErrorEvent) => {
        const railsError: RailsErrorResponseData = err.error
        isProduction || console.log(err)
       options?.onError && await options.onError(err, undefined, null)
        // setErrorState(railsError?.data?.errors ? getErrorList(railsError) : []) 
      },
      onSettled: () => {
        options?.onSettled
      }
    }
  )

  return resultUseMutation
}