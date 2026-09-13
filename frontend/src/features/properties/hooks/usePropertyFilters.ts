import { useState } from "react"

export function usePropertyFilters() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  return {
    search,
    status,
    setSearch,
    setStatus,
  }
}
