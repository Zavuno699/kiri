import type { ActivityRecord } from "../activityRecord"

export function activityByOutcome(
  records: ActivityRecord[],
  outcome: ActivityRecord["outcome"],
): ActivityRecord[] {
  return records.filter(
    (record) => record.outcome === outcome,
  )
}
