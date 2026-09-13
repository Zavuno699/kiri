import {
  dashboardResourceAdapter,
} from "../canonical/dashboardResourceAdapter";

export async function getDashboardApi<T = unknown>(
  id: string,
) {
  return dashboardResourceAdapter.get<T>(
    id,
  );
}
