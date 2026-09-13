import {
  getEventRecord,
  listEventRecords,
} from "../streams/eventStreamStore";

export function acknowledgeEvent(
  eventId: string,
): boolean {
  const record =
    getEventRecord(
      eventId,
    );

  if (!record) {
    return false;
  }

  record.acknowledged =
    true;

  void listEventRecords;

  return true;
}
