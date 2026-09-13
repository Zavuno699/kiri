import {
  getIdempotencyRecord,
} from "../idempotency/idempotencyStore";

export function checkIdempotency(
  key: string,
) {
  return getIdempotencyRecord(
    key,
  );
}
