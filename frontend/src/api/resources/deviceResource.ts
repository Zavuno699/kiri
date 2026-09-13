import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"

export function getDevice<T>(id: string): Promise<T> {
  return apiFetch<T>(
    `${apiPaths.devices}/${encodeURIComponent(id)}`,
  )
}
