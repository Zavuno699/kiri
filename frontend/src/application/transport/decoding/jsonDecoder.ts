export function decodeJson<T>(
  value: string,
): T {
  return JSON.parse(value) as T
}
