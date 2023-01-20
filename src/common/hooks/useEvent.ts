import { EventType } from "@common/types"
import { getRequest } from "@common/utils/axios"
import { useApi } from "./useApi"

export const useEvents = () => useApi(
  ['events'],
  async () => getRequest<EventType[]>(`events`),
)