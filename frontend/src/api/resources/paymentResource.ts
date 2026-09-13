import { apiFetch } from "../client"
import { apiPaths } from "../apiPaths"

export function getPayments<T>(): Promise<T> {
  return apiFetch<T>(apiPaths.payments)
}

export function getPayment<T>(id: string): Promise<T> {
  return apiFetch<T>(
    `${apiPaths.payments}/${encodeURIComponent(id)}`,
  )
}
