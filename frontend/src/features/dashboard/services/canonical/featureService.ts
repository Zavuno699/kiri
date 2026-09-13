import {
  dashboardApiClient,
} from "../../api/canonical/clients/client";

export const dashboardCanonicalService = {
  list: (
    context?: Parameters<
      typeof dashboardApiClient.list
    >[0],
  ) =>
    dashboardApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof dashboardApiClient.get
    >[1],
  ) =>
    dashboardApiClient.get(
      id,
      context,
    ),
};
