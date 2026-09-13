import { useState } from "react"

export function useLockSelection() {
  const [selectedId, setSelectedId] =
    useState<string | undefined>()

  return {
    selectedId,
    select: setSelectedId,
    clear: () => setSelectedId(undefined),
  }
}
