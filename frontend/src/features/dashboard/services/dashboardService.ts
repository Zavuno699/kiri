import { apiFetch } from "../../../api/client"
import type { DashboardSnapshot } from "../types/dashboard"

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  return apiFetch<DashboardSnapshot>("/api/v1/dashboard/overview")
}
