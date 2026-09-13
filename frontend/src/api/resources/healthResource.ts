import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"
import type { ApiHealth } from "../httpTypes"

export function getHealth(): Promise<ApiHealth> {
  return apiFetch<ApiHealth>(apiPaths.health)
}

export function getReadiness(): Promise<ApiHealth> {
  return apiFetch<ApiHealth>(apiPaths.ready)
}
