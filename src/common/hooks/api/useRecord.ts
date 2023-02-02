import { DateType, DetailRecordType } from "@common/types";
import { getRequest, postRequest } from "@common/utils/axios";
import { useApi, useGenericMutation } from "../useApi";

export const useRecords = (dateType: DateType) => useApi(
  ['records', dateType],
  async (dateType) => getRequest<DetailRecordType>(`records?type=${dateType}`),
)

export const useCreateRecord = () =>
  useGenericMutation<any, any, any[]>(
    async (params) => postRequest<any>(`records`, { records: params.records, exerciseId: params.exerciseId, date: params.date })
  );