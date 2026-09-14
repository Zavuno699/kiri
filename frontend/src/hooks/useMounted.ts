import { useEffect, useState } from "react"

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    return () => setMounted(false)
  }, [])

  return mounted
}
