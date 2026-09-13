import type { ReactNode } from "react"
import { FilterBar } from "../../../../components/operator/filters/FilterBar"

export function DashboardFilterBar({
  children,
}: {
  children?: ReactNode
}) {
  return <FilterBar>{children}</FilterBar>
}
