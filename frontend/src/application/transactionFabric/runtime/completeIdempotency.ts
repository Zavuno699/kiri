import {
  updateIdempotencyRecord,
} from "../idempotency/idempotencyStore";

export function completeIdempotency<T>(
  key: string,
  result: T,
) {
  return updateIdempotencyRecord(
    key,
    {
      status:
        "completed",
      result,
    },
  );
}
