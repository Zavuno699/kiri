import type {
  IdempotencyRecord,
} from "../contracts/idempotencyRecord";

const records = new Map<
  string,
  IdempotencyRecord
>();

export function reserveIdempotencyKey(
  key: string,
  transactionId: string,
  operation: string,
): {
  accepted: boolean;
  record: IdempotencyRecord;
} {
  const existing =
    records.get(
      key,
    );

  if (existing) {
    return {
      accepted:
        false,
      record:
        existing,
    };
  }

  const now =
    new Date().toISOString();

  const record: IdempotencyRecord = {
    key,
    transactionId,
    operation,
    status:
      "reserved",
    result:
      null,
    createdAt:
      now,
    updatedAt:
      now,
  };

  records.set(
    key,
    record,
  );

  return {
    accepted:
      true,
    record,
  };
}

export function getIdempotencyRecord(
  key: string,
): IdempotencyRecord | null {
  return (
    records.get(
      key,
    ) ??
    null
  );
}

export function updateIdempotencyRecord<T>(
  key: string,
  patch:
    Partial<
      IdempotencyRecord<T>
    >,
): IdempotencyRecord<T> | null {
  const current =
    records.get(
      key,
    );

  if (!current) {
    return null;
  }

  const next = {
    ...current,
    ...patch,
    updatedAt:
      new Date().toISOString(),
  } as IdempotencyRecord<T>;

  records.set(
    key,
    next,
  );

  return next;
}

export function listIdempotencyRecords(): IdempotencyRecord[] {
  return [
    ...records.values(),
  ];
}
