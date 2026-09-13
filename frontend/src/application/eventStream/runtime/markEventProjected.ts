import {
  getEventRecord,
} from "../streams/eventStreamStore";

export function markEventProjected(
  eventId: string,
): boolean {
  const record =
    getEventRecord(
      eventId,
    );

  if (!record) {
    return false;
  }

  record.projected =
    true;

  return true;
}
