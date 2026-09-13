import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"

export function getLeases<T>(): Promise<T> {
  return apiFetch<T>(apiPaths.leases)
}

export function getLease<T>(id: string): Promise<T> {
  return apiFetch<T>(
    `${apiPaths.leases}/${encodeURIComponent(id)}`,
  )
}
