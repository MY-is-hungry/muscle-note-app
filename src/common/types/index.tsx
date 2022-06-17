import { AxiosRequestConfig } from "axios"
import { QueryKey, UseMutationOptions, UseQueryOptions } from "react-query"

export type RootStackScreenProps = {
  Login: undefined
  Home: undefined
}

export type ProgressType = {
  goal: number
  current: number
}

// Railsのレスポンス
export type RailsResponse<T> = {
  data: T,
  msg: string,
  state: string
  redirectUrl?: string
  jwt?: string
  status: number
}

export type RailsErrorResponseData = {
  data: {
    errors?: any[]
    msg?: string
    redirectUrl?: string
  }
  status: number
}

export type ErrorResponse = {
  error: {
    data: {
      msg: string
    }
  }
}

// React Queryのhooks 
// TODO: optionsの型を確認
export type UseQueryProps<T> = {
  queryKey?: string
  deps?: QueryKey
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, "queryKey" | "queryFn">
  requestConfig: QueryRequestConfig
}

export type QueryRequestConfig = {
  url: string
  params?: string
}

export type MutationRequestConfig = {
  method: string
  url: string
  config: AxiosRequestConfig
}

export type UseMutationProps<T> = {
  queryKey?: string
  deps?: QueryKey
  options?: UseMutationOptions
  requestConfig: MutationRequestConfig
}


// TODO: 型定義
export type TUseQueryOptions = Partial<{
  deps: QueryKey
  options: UseQueryOptions
  urlParams: any
}>;

// TODO: 型定義
export type TUseMutationOptions = Partial<{
  deps: QueryKey
  options: UseMutationOptions
  urlParams: any
}>
