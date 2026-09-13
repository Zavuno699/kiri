export function applyFilters<T extends Record<string, unknown>>(
  records: T[],
  values: Record<string, unknown>,
): T[] {
  return records.filter((record) =>
    Object.entries(values).every(
      ([key, expected]) => {
        if (
          expected === undefined ||
          expected === ""
        ) {
          return true
        }

        return record[key] === expected
      },
    ),
  )
}
