import { RecordType } from "@common/types"

export const getTotalVolume = (records: RecordType[]): number => {
  return records.reduce((totalVolume, record) => totalVolume + record.volume, 0)
}