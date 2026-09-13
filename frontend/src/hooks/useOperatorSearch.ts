import { useMemo, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"

export function useOperatorSearch<T>(
  records: T[],
  toSearchableText: (record: T) => string,
) {
  const [query, setQuery] = useState("")
  const debounced = useDebouncedValue(query)

  const filtered = useMemo(() => {
    const normalized = debounced
      .trim()
      .toLowerCase()

    if (!normalized) return records

    return records.filter((record) =>
      toSearchableText(record)
        .toLowerCase()
        .includes(normalized),
    )
  }, [records, debounced, toSearchableText])

  return {
    query,
    setQuery,
    filtered,
  }
}
