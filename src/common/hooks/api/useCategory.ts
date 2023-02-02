import { ExerciseType } from "@common/types";
import { getRequest } from "@common/utils/axios";
import { useApi } from "../useApi";

export const useCategories = () => useApi(
  ['categories'],
  async (serializeType) => getRequest<ExerciseType[]>(`categories?serialize_type=${serializeType}`),
)