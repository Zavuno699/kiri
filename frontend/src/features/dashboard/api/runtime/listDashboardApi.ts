import {
  dashboardResourceAdapter,
} from "../canonical/dashboardResourceAdapter";

export async function listDashboardApi<T = unknown>() {
  return dashboardResourceAdapter.list<T>();
}
