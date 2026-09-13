export function decodeResponse<T>(
  value: unknown,
): T {
  return value as T
}
