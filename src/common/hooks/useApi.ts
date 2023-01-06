import { createAxiosInstance, getApiConfig, parseSnakeToCamel } from "@common/utils/axios"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { useEffect, useState } from "react"

export const useApi = (axiosParams: AxiosRequestConfig) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<AxiosResponse>()
  const [error, setError] = useState<AxiosError>()
  const axiosInstance = axios.create(getApiConfig())

  const fetchData = async (params: AxiosRequestConfig) => {
    setLoading(true)
    try {
      const result = await axiosInstance.request(params)
      if (process.env.NODE_ENV === 'development') {
        console.log(parseSnakeToCamel(result))
      }
      setData(result)
    } catch( err: any ) {
      if (process.env.NODE_ENV === 'development') {
        console.log(parseSnakeToCamel(err))
      }
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const sendData = () => {
    fetchData(axiosParams)
  }

  useEffect(() => {
    fetchData(axiosParams)
  }, [])

  return { loading, error, data, sendData }
}