import { useCallback, useState } from "react"
import type { AsyncState } from "../types/common/async"

export function useAsyncState<T>() {
  const [state, setState] =
    useState<AsyncState<T>>({
      status: "idle",
    })

  const run = useCallback(
    async (operation: () => Promise<T>) => {
      setState({ status: "loading" })

      try {
        const data = await operation()
        setState({
          status: "success",
          data,
        })
        return data
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Operation failed"

        setState({
          status: "error",
          error: message,
        })

        throw error
      }
    },
    [],
  )

  return {
    state,
    run,
  }
}
