import type { ReactNode } from "react"

export interface TableColumn<T> {
  key: string
  header: string
  width?: string
  render: (row: T) => ReactNode
  sortable?: boolean
}

export interface TableAction<T> {
  label: string
  run: (row: T) => void
  tone?: "default" | "danger" | "success"
}
