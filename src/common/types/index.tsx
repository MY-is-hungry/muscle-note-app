import { AxiosRequestConfig } from "axios"
import { QueryKey, UseMutationOptions, UseQueryOptions } from "react-query"

export type RootStackScreenProps = {
  Login: undefined
  Home: undefined
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
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, "queryKey" | "queryFn"> | undefined
  requestConfig: QueryRequestConfig
}

export type QueryRequestConfig = {
  url: string
  params?: string
}

export type MutationRequestConfig = {
  method: string
  url: string
  config?: AxiosRequestConfig
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
  options: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, "queryKey" | "queryFn"> | undefined
  urlParams: any
}>;

// TODO: 型定義
export type TUseMutationOptions = Partial<{
  deps: QueryKey
  options: UseMutationOptions
  urlParams: any
}>

// --------------------------
// 汎用Type
type ModelBaseType = {
  id: number
  createdAt: string
  updatedAt: string
}

type RecordBaseType = {
  note: string
  recordedOn: string
}
// --------------------------


export type ProgressType = {
  goal: number
  current: number
}

export type EventRecordType = ModelBaseType & RecordBaseType & { 
  volume: number
}

export type DailyRecordType = ModelBaseType & RecordBaseType & { 
  eventRecords: EventRecordType[]
}


export type MonthlyRecordType = DailyRecordType[]