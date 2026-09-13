import {
  dashboardResourceAdapter,
} from "../canonical/dashboardResourceAdapter";

export async function updateDashboardApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return dashboardResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
