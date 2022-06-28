import { AxiosResponse } from "axios"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { useRecoilState } from "recoil"
import { initialErrorState } from "@common/recoil/atoms"
import { isProduction } from "@common/utils/boolean"
import { MonthlyRecordType, RailsErrorResponseData, RailsResponse, TUseMutationOptions, TUseQueryOptions, UseMutationProps, UseQueryProps } from '@common/types'
import { useRefresh } from "./useRefresh"
import { axiosInstance, genMutationAxiosRequest } from "@common/utils/axios"
import { GET_MONTHLY_RECORD, GET_USER, POST, POST_USER } from "@common/constants/reactQueryKeys"

// TODO: 全体の型づけ

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
        const res = await axiosInstance().get(requestConfig.url)
        // genMutationAxiosRequest({...requestConfig});
        return res.data
      } catch (err: any) {
        const railsError: RailsErrorResponseData = err.error
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

export const useUserQuery = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<RailsResponse<any>> => {
  return useQueryWrapper<RailsResponse<any>>({
    queryKey: GET_USER,
    deps,
    options,
    requestConfig: {
      url: `users/${urlParams.id}`,
    },
  })
}

export const useSignUpMutation = ({ deps, options, urlParams }: TUseMutationOptions): UseMutationResult<RailsResponse<any>> => {
  return useMutationWrapper<RailsResponse<any>>({
    queryKey: POST_USER,
    deps,
    options,
    requestConfig: {
      method: POST,
      url: `users`
    }
  })
}

export const useMonthlyRecord = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<MonthlyRecordType> => {
  return useQueryWrapper<MonthlyRecordType>({
    queryKey: GET_MONTHLY_RECORD,
    deps,
    options,
    requestConfig: {
      url: `monthly_records`,
    },
  })
}

