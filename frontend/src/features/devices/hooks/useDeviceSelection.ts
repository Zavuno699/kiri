import { useState } from "react"

export function useDeviceSelection() {
  const [selectedId, setSelectedId] =
    useState<string | undefined>()

  return {
    selectedId,
    select: setSelectedId,
    clear: () => setSelectedId(undefined),
  }
}
