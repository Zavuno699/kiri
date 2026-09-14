import {
  dashboardApiClient,
} from "../../api/canonical/clients/client";

export const dashboardCanonicalService = {
  list: () =>
    dashboardApiClient.list(),

  get: (
    id: string,
  ) =>
    dashboardApiClient.get(id),
};
