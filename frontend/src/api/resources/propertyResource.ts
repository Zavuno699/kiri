import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"

export function getProperties<T>(): Promise<T> {
  return apiFetch<T>(apiPaths.properties)
}

export function getProperty<T>(id: string): Promise<T> {
  return apiFetch<T>(
    `${apiPaths.properties}/${encodeURIComponent(id)}`,
  )
}
