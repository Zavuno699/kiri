import {
  updateIdempotencyRecord,
} from "../idempotency/idempotencyStore";

export function failIdempotency(
  key: string,
  result: unknown,
) {
  return updateIdempotencyRecord(
    key,
    {
      status:
        "failed",
      result,
    },
  );
}
