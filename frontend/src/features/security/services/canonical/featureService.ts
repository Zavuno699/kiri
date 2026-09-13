import {
  securityApiClient,
} from "../../api/canonical/clients/client";

export const securityCanonicalService = {
  list: (
    context?: Parameters<
      typeof securityApiClient.list
    >[0],
  ) =>
    securityApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof securityApiClient.get
    >[1],
  ) =>
    securityApiClient.get(
      id,
      context,
    ),
};
