export function sortRecords<T extends Record<string, unknown>>(
  records: T[],
  field: string,
  direction: "asc" | "desc" = "asc",
): T[] {
  return [...records].sort((left, right) => {
    const a = left[field]
    const b = right[field]

    if (a === b) return 0

    const result =
      String(a ?? "").localeCompare(
        String(b ?? ""),
        undefined,
        { numeric: true },
      )

    return direction === "asc"
      ? result
      : -result
  })
}
