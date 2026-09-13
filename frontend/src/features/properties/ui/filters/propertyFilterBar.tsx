import type { ReactNode } from "react"
import { FilterBar } from "../../../../components/operator/filters/FilterBar"

export function PropertyFilterBar({
  children,
}: {
  children?: ReactNode
}) {
  return <FilterBar>{children}</FilterBar>
}
