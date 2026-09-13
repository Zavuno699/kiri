import type { LockApiRecord } from "../../contracts/lockApiRecord"

export function mapLockResponse(
  value: unknown,
): LockApiRecord {
  const source =
    value &&
    typeof value === "object"
      ? value as Record<string, unknown>
      : {}

  return {
    id:
      typeof source.id === "string"
        ? source.id
        : "",
    status:
      typeof source.status === "string"
        ? source.status
        : undefined,
    version:
      typeof source.version === "number"
        ? source.version
        : undefined,
    updatedAt:
      typeof source.updatedAt === "string"
        ? source.updatedAt
        : undefined,
    metadata:
      source.metadata &&
      typeof source.metadata === "object"
        ? source.metadata as Record<string, unknown>
        : undefined,
  }
}
