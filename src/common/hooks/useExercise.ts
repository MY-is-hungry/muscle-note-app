import { DateType, ExerciseWithRecordType } from "@common/types"
import { getRequest } from "@common/utils/axios"
import { useApi } from "./useApi"

export const useExercisesWithRecords = (dateType: DateType, date?: string) => {
  const dateParams = date ? `&date=${date}` : ''
  const dateTypeParams = `type=${dateType}`
  return useApi(
    ['exercisesWithRecords', date],
    async () => getRequest<ExerciseWithRecordType[]>(`exercises/with_records?${dateTypeParams}${dateParams}`),
  )
}