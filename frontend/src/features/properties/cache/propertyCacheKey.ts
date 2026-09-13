export function propertyCacheKey(
  id?: string,
): string {
  return id
    ? "properties:" + id
    : "properties:list"
}
