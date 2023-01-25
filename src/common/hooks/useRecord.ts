import { DateType, DetailRecordType } from "@common/types"
import { createAxiosInstance } from "@common/utils/axios"
import { AxiosRequestConfig } from "axios"
import { useApi } from "./useApi"

const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const axiosInstance = createAxiosInstance()
  return axiosInstance.get(url, config).then((res) => res.data)
}

export const useRecords = (dateType: DateType) => useApi(
  ['records', dateType],
  async (dateType) => getRequest<DetailRecordType>(`records?type=${dateType}`),
)