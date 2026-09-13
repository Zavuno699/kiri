import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"

export function getDashboard<T>(): Promise<T> {
  return apiFetch<T>(`${apiPaths.dashboard}/overview`)
}
