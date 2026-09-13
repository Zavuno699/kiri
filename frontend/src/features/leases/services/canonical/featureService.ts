import {
  leasesApiClient,
} from "../../api/canonical/clients/client";

export const leasesCanonicalService = {
  list: (
    context?: Parameters<
      typeof leasesApiClient.list
    >[0],
  ) =>
    leasesApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof leasesApiClient.get
    >[1],
  ) =>
    leasesApiClient.get(
      id,
      context,
    ),
};
