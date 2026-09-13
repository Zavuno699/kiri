import type { ActivityRecord } from "../activityRecord"

export function activityByDomain(
  records: ActivityRecord[],
  domain: string,
): ActivityRecord[] {
  return records.filter(
    (record) => record.domain === domain,
  )
}
