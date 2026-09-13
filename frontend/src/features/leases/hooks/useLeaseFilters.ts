import { useState } from "react"

export function useLeaseFilters() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  return {
    search,
    status,
    setSearch,
    setStatus,
  }
}
