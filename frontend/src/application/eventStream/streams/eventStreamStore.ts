import type {
  EventRecord,
} from "../contracts/eventRecord";

const records: EventRecord[] = [];
let sequence =
  0;

export function appendEventRecord(
  record: Omit<
    EventRecord,
    "sequence"
  >,
): EventRecord {
  sequence +=
    1;

  const next: EventRecord = {
    ...record,
    sequence,
  };

  records.unshift(
    next,
  );

  return next;
}

export function listEventRecords(): EventRecord[] {
  return [
    ...records,
  ];
}

export function getEventRecord(
  eventId: string,
): EventRecord | null {
  return (
    records.find(
      (record) =>
        record.envelope
          .eventId ===
        eventId,
    ) ??
    null
  );
}

export function findEventsByCorrelationId(
  correlationId: string,
): EventRecord[] {
  return records.filter(
    (record) =>
      record.envelope
        .correlationId ===
      correlationId,
  );
}

export function findEventsByAggregateId(
  aggregateId: string,
): EventRecord[] {
  return records.filter(
    (record) =>
      record.envelope
        .aggregateId ===
      aggregateId,
  );
}
