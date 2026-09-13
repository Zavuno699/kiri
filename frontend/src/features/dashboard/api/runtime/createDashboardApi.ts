import {
  dashboardResourceAdapter,
} from "../canonical/dashboardResourceAdapter";

export async function createDashboardApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return dashboardResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
