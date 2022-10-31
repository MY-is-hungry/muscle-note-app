import { AxiosResponse } from "axios"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query"
import { useRecoilState } from "recoil"
import { initialErrorState } from "@common/recoil/atoms"
import { isProduction } from "@common/utils/boolean"
import { CategoryType, EventRecordType, EventType, RailsErrorResponseData, RailsResponse, TUseMutationOptions, TUseQueryOptions, UseMutationProps, UseQueryProps } from '@common/types'
import { useRefresh } from "./useRefresh"
import { axiosInstance, genMutationAxiosRequest } from "@common/utils/axios"
import { GET_CATEGORIES, GET_DAILY_RECORD, GET_EVENTS, GET_MONTHLY_RECORD } from "@common/constants/reactQueryKeys"

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

export const useMonthlyRecord = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<EventRecordType[]> => {
  return useQueryWrapper<EventRecordType[]>({
    queryKey: GET_MONTHLY_RECORD,
    deps,
    options,
    requestConfig: {
      url: `event_records/monthly`,
    },
  })
}

export const useDailyRecord = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<EventRecordType[]> => {
  return useQueryWrapper<EventRecordType[]>({
    queryKey: GET_DAILY_RECORD,
    deps,
    options,
    requestConfig: {
      url: `event_records/daily?date=${urlParams.date}`,
    },
  })
}

export const useCategories = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<CategoryType[]> => {
  return useQueryWrapper<CategoryType[]>({
    queryKey: GET_CATEGORIES,
    deps,
    options,
    requestConfig: {
      url: `categories?serialize_type=${urlParams?.serializeType}`,
    },
  })
}

export const useEvents = ({ deps, options, urlParams }: TUseQueryOptions): UseQueryResult<EventType[]> => {
  return useQueryWrapper<EventType[]>({
    queryKey: GET_EVENTS,
    deps,
    options,
    requestConfig: {
      url: `events`,
    },
  })
}

