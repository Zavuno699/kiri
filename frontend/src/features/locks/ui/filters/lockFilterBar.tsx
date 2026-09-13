import type { ReactNode } from "react"
import { FilterBar } from "../../../../components/operator/filters/FilterBar"

export function LockFilterBar({
  children,
}: {
  children?: ReactNode
}) {
  return <FilterBar>{children}</FilterBar>
}
