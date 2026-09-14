import {
  leasesApiClient,
} from "../../api/canonical/clients/client";

export const leasesCanonicalService = {
  list: () =>
    leasesApiClient.list(),

  get: (
    id: string,
  ) =>
    leasesApiClient.get(id),
};
