import { useState } from "react"

export function useDeviceFilters() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  return {
    search,
    status,
    setSearch,
    setStatus,
  }
}
