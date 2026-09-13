import {
  dashboardResourceAdapter,
} from "../canonical/dashboardResourceAdapter";

export async function deleteDashboardApi<
  TResult = unknown,
>(
  id: string,
) {
  return dashboardResourceAdapter.remove<TResult>(
    id,
  );
}
