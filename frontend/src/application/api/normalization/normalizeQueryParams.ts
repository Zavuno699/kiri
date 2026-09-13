export function normalizeQueryParams(
  query?: Record<
    string,
    string | number | boolean | undefined
  >,
): string {
  if (!query) {
    return "";
  }

  const entries =
    Object.entries(query)
      .filter(
        ([, value]) =>
          value !== undefined,
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      );

  return entries.length
    ? `?${entries.join("&")}`
    : "";
}
