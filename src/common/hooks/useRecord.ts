import { EventRecordType } from "@common/types"
import { createAxiosInstance } from "@common/utils/axios"
import { AxiosRequestConfig } from "axios"
import { useApi } from "./useApi"

const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const axiosInstance = createAxiosInstance()
  return axiosInstance.get(url, config).then((res) => res.data)
}

export const useMonthlyRecord = () => useApi(
  ['event_records'],
  async () => getRequest<EventRecordType[]>(`event_records/monthly`),
)

export const useDailyRecord = (date: string) => useApi(
  ['event_records', date],
  async (date) => getRequest<EventRecordType[]>(`event_records/daily?date=${date}`)
)