import { EventRecordType } from "@common/types"

export const getTotalVolume = (eventRecords: EventRecordType[]): number => {
  return eventRecords.reduce((totalVolume, record) => totalVolume + record.volume, 0)
}